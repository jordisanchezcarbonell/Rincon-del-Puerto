import "server-only";
import { getOptionalServerEnv } from "@/lib/env";
import { sendTransactionalEmail } from "@/lib/email/client";
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

export async function sendNewReservationEmails(context: EmailContext) {
  const restaurantEmail = getOptionalServerEnv("RESTAURANT_NOTIFICATION_EMAIL");
  const restaurantTemplate = newReservationRestaurantTemplate(context);
  const customerTemplate = requestReceivedCustomerTemplate(context);

  await Promise.allSettled([
    sendTransactionalEmail({
      to: restaurantEmail,
      ...restaurantTemplate
    }),
    context.reservation.email
      ? sendTransactionalEmail({
          to: context.reservation.email,
          ...customerTemplate
        })
      : Promise.resolve({ status: "skipped", reason: "missing_customer_email" })
  ]);
}

export async function sendReservationAcceptedEmail(context: EmailContext) {
  if (!context.reservation.email) {
    return;
  }

  await sendTransactionalEmail({
    to: context.reservation.email,
    ...reservationAcceptedTemplate(context)
  });
}

export async function sendReservationRejectedEmail(context: EmailContext) {
  if (!context.reservation.email) {
    return;
  }

  await sendTransactionalEmail({
    to: context.reservation.email,
    ...reservationRejectedTemplate(context)
  });
}

export async function sendReservationCancelledEmails(context: EmailContext) {
  const restaurantEmail = getOptionalServerEnv("RESTAURANT_NOTIFICATION_EMAIL");

  await Promise.allSettled([
    sendTransactionalEmail({
      to: restaurantEmail,
      ...reservationCancelledRestaurantTemplate(context)
    }),
    context.reservation.email
      ? sendTransactionalEmail({
          to: context.reservation.email,
          ...reservationCancelledTemplate(context)
        })
      : Promise.resolve({ status: "skipped", reason: "missing_customer_email" })
  ]);
}
