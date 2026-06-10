import { z } from "zod";
import { SEATING_PREFERENCES } from "@/types/domain";

const phoneRegex = /^[+()\d\s.-]{6,24}$/;

export const reservationFormSchema = z.object({
  name: z.string().trim().min(2, "Indica tu nombre").max(120),
  phone: z
    .string()
    .trim()
    .regex(phoneRegex, "Indica un teléfono válido")
    .max(24),
  email: z
    .string()
    .trim()
    .email("Indica un email válido")
    .optional()
    .or(z.literal("")),
  date: z.string().trim().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().trim().regex(/^\d{2}:\d{2}$/),
  guests: z.coerce.number().int().min(1).max(40),
  seatingPreference: z.enum(SEATING_PREFERENCES),
  notes: z.string().trim().max(800).optional().or(z.literal("")),
  allergies: z.string().trim().max(800).optional().or(z.literal("")),
  highChair: z.coerce.boolean().default(false),
  groupDetails: z.string().trim().max(1000).optional().or(z.literal("")),
  privacyAccepted: z.literal("on", {
    errorMap: () => ({ message: "Debes aceptar la política de privacidad" })
  })
});

export type ReservationFormValues = z.infer<typeof reservationFormSchema>;

export function formDataToReservationInput(formData: FormData) {
  return reservationFormSchema.parse({
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email") ?? "",
    date: formData.get("date"),
    time: formData.get("time"),
    guests: formData.get("guests"),
    seatingPreference: formData.get("seatingPreference"),
    notes: formData.get("notes") ?? "",
    allergies: formData.get("allergies") ?? "",
    highChair: formData.get("highChair") ?? false,
    groupDetails: formData.get("groupDetails") ?? "",
    privacyAccepted: formData.get("privacyAccepted")
  });
}
