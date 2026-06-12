import "server-only";
import { getOptionalServerEnv } from "@/lib/env";
import { sendTransactionalEmail, type EmailSendResult } from "@/lib/email/client";
import {
  newReservationRestaurantTemplate,
  requestReceivedCustomerTemplate,
  reservationAcceptedTemplate,
  reservationCancelledRestaurantTemplate,
  reservationCancelledTemplate,
  reservationRejectedTemplate
} from "@/lib/email/templates";
import type { Reservation } from "@/types/domain";

type EmailContext = {
  restaurantName: string;
  reservation: Reservation;
};

function logResult(tag: string, result: EmailSendResult | { status: string; reason?: string }) {
  if (result.status === "sent") {
    console.log(`[email:${tag}] sent`);
  } else if (result.status === "skipped") {
    console.log(`[email:${tag}] skipped (${"reason" in result ? result.reason : "unknown"})`);
  } else {
    console.error(`[email:${tag}] failed (${"reason" in result ? result.reason : "unknown"})`);
  }
}

export async function sendNewReservationEmails(context: EmailContext) {
  const restaurantEmail = getOptionalServerEnv("RESTAURANT_NOTIFICATION_EMAIL");
  const restaurantTemplate = newReservationRestaurantTemplate(context);
  const customerTemplate = requestReceivedCustomerTemplate(context);

  const [restaurantResult, customerResult] = await Promise.allSettled([
    sendTransactionalEmail({
      to: restaurantEmail,
      ...restaurantTemplate
    }),
    context.reservation.email
      ? sendTransactionalEmail({
          to: context.reservation.email,
          ...customerTemplate
        })
      : Promise.resolve<EmailSendResult>({ status: "skipped", reason: "missing_customer_email" })
  ]);

  if (restaurantResult.status === "fulfilled") logResult("new:restaurant", restaurantResult.value);
  else console.error("[email:new:restaurant] rejected", restaurantResult.reason);
  if (customerResult.status === "fulfilled") logResult("new:customer", customerResult.value);
  else console.error("[email:new:customer] rejected", customerResult.reason);
}

export async function sendReservationAcceptedEmail(context: EmailContext) {
  if (!context.reservation.email) {
    logResult("accepted:customer", { status: "skipped", reason: "missing_customer_email" });
    return;
  }

  const result = await sendTransactionalEmail({
    to: context.reservation.email,
    ...reservationAcceptedTemplate(context)
  });
  logResult("accepted:customer", result);
}

export async function sendReservationRejectedEmail(context: EmailContext) {
  if (!context.reservation.email) {
    logResult("rejected:customer", { status: "skipped", reason: "missing_customer_email" });
    return;
  }

  const result = await sendTransactionalEmail({
    to: context.reservation.email,
    ...reservationRejectedTemplate(context)
  });
  logResult("rejected:customer", result);
}

export async function sendReservationCancelledEmails(context: EmailContext) {
  const restaurantEmail = getOptionalServerEnv("RESTAURANT_NOTIFICATION_EMAIL");

  const [restaurantResult, customerResult] = await Promise.allSettled([
    sendTransactionalEmail({
      to: restaurantEmail,
      ...reservationCancelledRestaurantTemplate(context)
    }),
    context.reservation.email
      ? sendTransactionalEmail({
          to: context.reservation.email,
          ...reservationCancelledTemplate(context)
        })
      : Promise.resolve<EmailSendResult>({ status: "skipped", reason: "missing_customer_email" })
  ]);

  if (restaurantResult.status === "fulfilled") logResult("cancelled:restaurant", restaurantResult.value);
  else console.error("[email:cancelled:restaurant] rejected", restaurantResult.reason);
  if (customerResult.status === "fulfilled") logResult("cancelled:customer", customerResult.value);
  else console.error("[email:cancelled:customer] rejected", customerResult.reason);
}
