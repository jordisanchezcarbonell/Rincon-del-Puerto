import { SITE_URL } from "@/lib/config/site";
import type { Reservation } from "@/types/domain";

type ReservationEmailContext = {
  restaurantName: string;
  reservation: Reservation;
};

export function newReservationRestaurantTemplate({
  restaurantName,
  reservation
}: ReservationEmailContext) {
  const subject = `Nueva solicitud de reserva: ${reservation.date} ${reservation.time}`;
  const text = [
    `Nueva solicitud para ${restaurantName}`,
    `Nombre: ${reservation.name}`,
    `Teléfono: ${reservation.phone}`,
    `Email: ${reservation.email ?? "No indicado"}`,
    `Fecha: ${reservation.date}`,
    `Hora: ${reservation.time}`,
    `Comensales: ${reservation.guests}`,
    `Preferencia: ${reservation.seatingPreference}`,
    `Trona: ${reservation.highChair ? "Sí" : "No"}`,
    `Alergias: ${reservation.allergies ?? "No indicado"}`,
    `Observaciones: ${reservation.notes ?? "Sin observaciones"}`
  ].join("\n");

  return {
    subject,
    text,
    html: wrapEmail(
      "Nueva solicitud de reserva",
      htmlList([
        ["Nombre", reservation.name],
        ["Teléfono", reservation.phone],
        ["Email", reservation.email ?? "No indicado"],
        ["Fecha", reservation.date],
        ["Hora", reservation.time],
        ["Comensales", reservation.guests.toString()],
        ["Preferencia", reservation.seatingPreference],
        ["Trona", reservation.highChair ? "Sí" : "No"],
        ["Alergias", reservation.allergies ?? "No indicado"],
        ["Observaciones", reservation.notes ?? "Sin observaciones"]
      ])
    )
  };
}

export function requestReceivedCustomerTemplate({
  restaurantName,
  reservation
}: ReservationEmailContext) {
  return {
    subject: `Solicitud recibida en ${restaurantName}`,
    text: `Hola ${reservation.name}. Hemos recibido tu solicitud para el ${reservation.date} a las ${reservation.time}. El restaurante la confirmará lo antes posible.`,
    html: wrapEmail(
      "Solicitud recibida",
      `<p>Hola ${escapeHtml(reservation.name)}.</p><p>Hemos recibido tu solicitud para el <strong>${reservation.date}</strong> a las <strong>${reservation.time}</strong>. El restaurante la confirmará lo antes posible.</p>`
    )
  };
}

export function reservationAcceptedTemplate({
  restaurantName,
  reservation
}: ReservationEmailContext) {
  const cancellationUrl = `${SITE_URL}/cancelar/${reservation.cancellationToken}`;

  return {
    subject: `Reserva confirmada en ${restaurantName}`,
    text: `Tu reserva para el ${reservation.date} a las ${reservation.time} está confirmada. Puedes cancelarla aquí: ${cancellationUrl}`,
    html: wrapEmail(
      "Reserva confirmada",
      `<p>Tu reserva para el <strong>${reservation.date}</strong> a las <strong>${reservation.time}</strong> está confirmada.</p><p><a href="${cancellationUrl}">Cancelar reserva</a></p>`
    )
  };
}

export function reservationRejectedTemplate({
  restaurantName,
  reservation
}: ReservationEmailContext) {
  return {
    subject: `No podemos confirmar tu reserva en ${restaurantName}`,
    text: `Lo sentimos. No podemos confirmar tu solicitud para el ${reservation.date} a las ${reservation.time}.`,
    html: wrapEmail(
      "No podemos confirmar la reserva",
      `<p>Lo sentimos. No podemos confirmar tu solicitud para el <strong>${reservation.date}</strong> a las <strong>${reservation.time}</strong>.</p>`
    )
  };
}

export function reservationCancelledTemplate({
  restaurantName,
  reservation
}: ReservationEmailContext) {
  return {
    subject: `Reserva cancelada en ${restaurantName}`,
    text: `La reserva para el ${reservation.date} a las ${reservation.time} ha sido cancelada.`,
    html: wrapEmail(
      "Reserva cancelada",
      `<p>La reserva para el <strong>${reservation.date}</strong> a las <strong>${reservation.time}</strong> ha sido cancelada.</p>`
    )
  };
}

export function reservationCancelledRestaurantTemplate({
  restaurantName,
  reservation
}: ReservationEmailContext) {
  return {
    subject: `Reserva cancelada: ${reservation.date} ${reservation.time}`,
    text: `${reservation.name} ha cancelado la reserva del ${reservation.date} a las ${reservation.time}.`,
    html: wrapEmail(
      `Cancelación en ${escapeHtml(restaurantName)}`,
      `<p><strong>${escapeHtml(reservation.name)}</strong> ha cancelado la reserva del <strong>${reservation.date}</strong> a las <strong>${reservation.time}</strong>.</p>`
    )
  };
}

function wrapEmail(title: string, body: string) {
  return `
    <div style="font-family: Arial, sans-serif; color: #173b3a; line-height: 1.6;">
      <h1 style="font-size: 24px;">${escapeHtml(title)}</h1>
      ${body}
    </div>
  `;
}

function htmlList(items: [string, string][]) {
  return `
    <dl>
      ${items
        .map(
          ([label, value]) =>
            `<dt style="font-weight: 700;">${escapeHtml(label)}</dt><dd style="margin: 0 0 12px;">${escapeHtml(value)}</dd>`
        )
        .join("")}
    </dl>
  `;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
