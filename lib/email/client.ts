import "server-only";
import { Resend } from "resend";
import nodemailer from "nodemailer";
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

  const dryRun = getOptionalServerEnv("EMAIL_DRY_RUN") === "true";
  const gmailUser = getOptionalServerEnv("GMAIL_USER");
  const gmailPassword = getOptionalServerEnv("GMAIL_APP_PASSWORD");
  const apiKey = getOptionalServerEnv("RESEND_API_KEY");
  const from =
    getOptionalServerEnv("RESEND_FROM_EMAIL") ??
    (gmailUser ? `Reservas <${gmailUser}>` : "Reservas <onboarding@resend.dev>");

  if (dryRun) {
    console.log("\n[email:dry-run] ───────────────────────────────");
    console.log(`  from:    ${from}`);
    console.log(`  to:      ${to}`);
    console.log(`  subject: ${subject}`);
    console.log(`  text:\n${text}`);
    console.log("──────────────────────────────────────────────\n");
    return { status: "sent", id: "dry-run" };
  }

  if (gmailUser && gmailPassword) {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: gmailUser, pass: gmailPassword }
      });
      const info = await transporter.sendMail({ from, to, subject, html, text });
      return { status: "sent", id: info.messageId ?? null };
    } catch (err) {
      const reason = err instanceof Error ? err.message : "unknown_gmail_error";
      return { status: "failed", reason };
    }
  }

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
