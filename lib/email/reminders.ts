import "server-only";
import { sendTransactionalEmail } from "@/lib/email/client";
import type { Reservation } from "@/types/domain";

export async function sendUpcomingReservationReminder({
  restaurantName,
  reservation
}: {
  restaurantName: string;
  reservation: Reservation;
}) {
  if (!reservation.email) {
    return;
  }

  await sendTransactionalEmail({
    to: reservation.email,
    subject: `Recordatorio de reserva en ${restaurantName}`,
    text: `Te recordamos tu reserva para el ${reservation.date} a las ${reservation.time}.`,
    html: `<p>Te recordamos tu reserva para el <strong>${reservation.date}</strong> a las <strong>${reservation.time}</strong>.</p>`
  });
}
