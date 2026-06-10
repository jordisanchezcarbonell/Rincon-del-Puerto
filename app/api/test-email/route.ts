import { NextResponse } from "next/server";
import { sendTransactionalEmail } from "@/lib/email/client";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const to = url.searchParams.get("to") ?? "kazukunpayeer@gmail.com";

  const result = await sendTransactionalEmail({
    to,
    subject: "Test · Rincón del Puerto",
    text: "Si recibes este correo, la conexión con Resend funciona correctamente.",
    html: `<div style="font-family:Inter,Arial,sans-serif;max-width:560px;margin:0 auto;padding:32px;background:#f7f1e7;color:#0b2547">
      <p style="margin:0 0 8px;font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:#b88a45">◇ Correo de prueba</p>
      <h1 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:36px;margin:0 0 16px;text-transform:uppercase;letter-spacing:.01em">Rincón del Puerto</h1>
      <p style="margin:0 0 16px;font-size:15px;line-height:1.6">Si estás leyendo esto, el envío de correos desde la web funciona correctamente.</p>
      <p style="margin:0;font-size:15px;line-height:1.6">Resend está conectado.</p>
    </div>`
  });

  return NextResponse.json({ to, ...result });
}
