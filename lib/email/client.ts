import "server-only";
import { Resend } from "resend";
import { getOptionalServerEnv } from "@/lib/env";

export type EmailPayload = {
  to?: string | null;
  subject: string;
  html: string;
  text: string;
};

export type EmailSendResult =
  | { status: "sent"; id: string | null }
  | { status: "skipped"; reason: string }
  | { status: "failed"; reason: string };

export async function sendTransactionalEmail({
  to,
  subject,
  html,
  text
}: EmailPayload): Promise<EmailSendResult> {
  if (!to) {
    return { status: "skipped", reason: "missing_recipient" };
  }

  const apiKey = getOptionalServerEnv("RESEND_API_KEY");
  const from = getOptionalServerEnv("RESEND_FROM_EMAIL") ?? "Reservas <onboarding@resend.dev>";

  if (!apiKey) {
    return { status: "skipped", reason: "missing_resend_api_key" };
  }

  const resend = new Resend(apiKey);
  const { data, error } = await resend.emails.send({
    from,
    to,
    subject,
    html,
    text
  });

  if (error) {
    return { status: "failed", reason: error.message };
  }

  return { status: "sent", id: data?.id ?? null };
}
