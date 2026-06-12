export type ReservationActionResult = {
  status: "idle" | "success" | "error";
  message: string;
};

export const initialReservationActionState: ReservationActionResult = {
  status: "idle",
  message: ""
};
