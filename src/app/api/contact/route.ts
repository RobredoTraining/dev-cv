import { NextResponse } from "next/server";
import { Resend } from "resend";


const resend = new Resend(process.env.RESEND_API_KEY);

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const { name, email, message, website } = body as {
      name?: string;
      email?: string;
      message?: string;
      website?: string;
    };

    // Honeypot: si viene relleno, es bot
    if (website && website.trim().length > 0) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    if (!isEmail(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const NAME_MAX = 80;
    const EMAIL_MAX = 120;
    const MESSAGE_MAX = 1500;

    const clean = (s: string) => s.trim();

    const nameClean = clean(name);
    const emailClean = clean(email);
    const messageClean = clean(message);

    if (nameClean.length === 0 || emailClean.length === 0 || messageClean.length === 0) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    if (nameClean.length > NAME_MAX) {
      return NextResponse.json({ error: `Name too long (max ${NAME_MAX})` }, { status: 400 });
    }
    if (emailClean.length > EMAIL_MAX) {
      return NextResponse.json({ error: `Email too long (max ${EMAIL_MAX})` }, { status: 400 });
    }
    if (messageClean.length > MESSAGE_MAX) {
      return NextResponse.json({ error: `Message too long (max ${MESSAGE_MAX})` }, { status: 400 });
    }

    const to = process.env.CONTACT_TO || "probredodev@gmail.com";
    const from = process.env.CONTACT_FROM || "onboarding@resend.dev";

    const subject = `Nuevo mensaje desde tu portfolio — ${nameClean}`;

    const text = [
      `Nombre: ${nameClean}`,
      `Email: ${emailClean}`,
      "",
      "Mensaje:",
      messageClean,
    ].join("\n");

    const { error } = await resend.emails.send({
      from,
      to,
      subject,
      replyTo: emailClean,
      text,
    });


    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Server error" },
      { status: 500 }
    );
  }
}
