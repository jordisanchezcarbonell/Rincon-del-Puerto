import "server-only";
import { sendTransactionalEmail, type EmailSendResult } from "@/lib/email/client";
import type { Reservation } from "@/types/domain";

export async function sendUpcomingReservationReminder({
  restaurantName,
  reservation
}: {
  restaurantName: string;
  reservation: Reservation;
}): Promise<EmailSendResult> {
  if (!reservation.email) {
    return { status: "skipped", reason: "missing_customer_email" };
  }

  const subject = `Recordatorio: tu reserva mañana en ${restaurantName}`;
  const text = `Hola ${reservation.name},

Te recordamos tu reserva en ${restaurantName} para mañana ${reservation.date} a las ${reservation.time}.
Comensales: ${reservation.guests}.

Si no puedes venir, por favor cancela tu reserva para que otros clientes puedan reservar.

¡Te esperamos!`;

  const html = `<div style="font-family:Inter,Arial,sans-serif;max-width:560px;margin:0 auto;padding:32px;background:#f7f1e7;color:#0b2547">
    <p style="margin:0 0 8px;font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:#b88a45">◇ Recordatorio</p>
    <h1 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:32px;margin:0 0 16px;text-transform:uppercase;letter-spacing:.01em">${restaurantName}</h1>
    <p style="margin:0 0 16px;font-size:15px;line-height:1.6">Hola <strong>${reservation.name}</strong>, te esperamos mañana.</p>
    <table style="margin:16px 0;font-size:15px;line-height:1.8">
      <tr><td style="padding-right:16px;color:#b88a45">Fecha</td><td><strong>${reservation.date}</strong></td></tr>
      <tr><td style="padding-right:16px;color:#b88a45">Hora</td><td><strong>${reservation.time}</strong></td></tr>
      <tr><td style="padding-right:16px;color:#b88a45">Comensales</td><td><strong>${reservation.guests}</strong></td></tr>
    </table>
    <p style="margin:24px 0 0;font-size:13px;line-height:1.6;color:#0b2547cc">Si no puedes venir, te agradecemos que canceles tu reserva para liberar la mesa.</p>
  </div>`;

  return sendTransactionalEmail({
    to: reservation.email,
    subject,
    text,
    html
  });
}
