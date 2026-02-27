import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
  website?: string;
  recaptchaToken?: string;
};

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

type RecaptchaVerifyResponse = {
  success?: boolean;
  score?: number;
  action?: string;
  hostname?: string;
  challenge_ts?: string;
  "error-codes"?: string[];
};

const rateLimitStore = new Map<string, RateLimitEntry>();

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const RECAPTCHA_ACTION = "contact_form_submit";

function sanitize(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function sanitizeHeaderValue(value: string): string {
  return value.replace(/[\r\n]+/g, " ").replace(/\s+/g, " ").trim();
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function parseBooleanEnv(raw: string | undefined, fallback = false): boolean {
  if (typeof raw !== "string") {
    return fallback;
  }

  const value = raw.toLowerCase().trim();
  return value === "true";
}

function parseMinScore(raw: string | undefined): number {
  const parsed = Number(raw ?? "0.5");
  if (!Number.isFinite(parsed)) {
    return 0.5;
  }

  return Math.min(1, Math.max(0, parsed));
}

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const existing = rateLimitStore.get(key);

  if (!existing || existing.resetAt < now) {
    rateLimitStore.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (existing.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  existing.count += 1;
  rateLimitStore.set(key, existing);
  return false;
}

function formatSubmissionDate(date: Date): string {
  return new Intl.DateTimeFormat("ro-RO", {
    timeZone: "Europe/Chisinau",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(date);
}

async function verifyRecaptcha({
  token,
  remoteIp,
}: {
  token: string;
  remoteIp: string;
}): Promise<{ ok: true } | { ok: false; reason: string }> {
  const bypass = parseBooleanEnv(process.env.RECAPTCHA_V3_BYPASS, false);
  if (bypass) {
    return { ok: true };
  }

  const secret = process.env.RECAPTCHA_V3_SECRET_KEY;
  if (!secret) {
    return { ok: false, reason: "Missing RECAPTCHA_V3_SECRET_KEY environment configuration." };
  }

  if (!token) {
    return { ok: false, reason: "reCAPTCHA token is missing." };
  }

  const params = new URLSearchParams();
  params.set("secret", secret);
  params.set("response", token);
  if (remoteIp !== "unknown-ip") {
    params.set("remoteip", remoteIp);
  }

  let response: Response;
  try {
    response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
      cache: "no-store",
    });
  } catch {
    return { ok: false, reason: "Could not reach reCAPTCHA verification service." };
  }

  if (!response.ok) {
    return { ok: false, reason: "reCAPTCHA verification request failed." };
  }

  const result = (await response.json()) as RecaptchaVerifyResponse;
  if (!result.success) {
    return { ok: false, reason: "reCAPTCHA verification was not successful." };
  }

  if (result.action && result.action !== RECAPTCHA_ACTION) {
    return { ok: false, reason: "reCAPTCHA action mismatch." };
  }

  const minScore = parseMinScore(process.env.RECAPTCHA_V3_MIN_SCORE);
  if (typeof result.score === "number" && result.score < minScore) {
    return { ok: false, reason: "reCAPTCHA score was too low." };
  }

  return { ok: true };
}

async function sendEmail({
  name,
  email,
  message,
  submittedAt,
}: {
  name: string;
  email: string;
  message: string;
  submittedAt: Date;
}) {
  const contactTo = process.env.CONTACT_TO_EMAIL;
  const contactFrom = process.env.CONTACT_FROM_EMAIL;

  if (!contactTo || !contactFrom) {
    throw new Error("Missing CONTACT_TO_EMAIL or CONTACT_FROM_EMAIL environment configuration.");
  }

  const submittedAtFormatted = formatSubmissionDate(submittedAt);
  const headerName = sanitizeHeaderValue(name);
  const headerEmail = sanitizeHeaderValue(email);

  const subject = `Contact - Mesage - Webiste [${headerName}] - [${headerEmail}] - [${submittedAtFormatted}]`;
  const textBody = [
    "Contact Form Submission",
    `Date/Time: ${submittedAtFormatted}`,
    `Name: ${name}`,
    `Email: ${email}`,
    "",
    "Message:",
    message,
  ].join("\n");

  const htmlBody = `
    <h2>Contact Form Submission</h2>
    <p><strong>Date/Time:</strong> ${submittedAtFormatted}</p>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Message:</strong></p>
    <p>${message.replace(/\n/g, "<br />")}</p>
  `;

  if (process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: contactFrom,
      to: contactTo,
      replyTo: email,
      subject,
      text: textBody,
      html: htmlBody,
    });

    return;
  }

  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT ?? "465");
  const smtpSecure = parseBooleanEnv(process.env.SMTP_SECURE, smtpPort === 465);
  const smtpUser = process.env.SMTP_USER;
  const smtpPassword = process.env.SMTP_PASSWORD;

  if (!smtpHost || !smtpUser || !smtpPassword) {
    throw new Error("Email provider is not configured. Set RESEND_API_KEY or SMTP credentials.");
  }

  const nodemailer = await import("nodemailer");
  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    auth: {
      user: smtpUser,
      pass: smtpPassword,
    },
  });

  await transporter.sendMail({
    from: contactFrom,
    to: contactTo,
    replyTo: email,
    subject,
    text: textBody,
    html: htmlBody,
  });
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown-ip";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      {
        error: "Too many requests. Please wait a minute and try again.",
      },
      { status: 429 },
    );
  }

  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request payload." }, { status: 400 });
  }

  const name = sanitize(payload.name);
  const email = sanitize(payload.email);
  const message = sanitize(payload.message);
  const website = sanitize(payload.website);
  const recaptchaToken = sanitize(payload.recaptchaToken);

  if (website.length > 0) {
    return NextResponse.json({ message: "Message sent." }, { status: 200 });
  }

  if (name.length < 2 || name.length > 80) {
    return NextResponse.json({ error: "Name must be between 2 and 80 characters." }, { status: 400 });
  }

  if (!isValidEmail(email) || email.length > 160) {
    return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
  }

  if (message.length < 20 || message.length > 2000) {
    return NextResponse.json(
      { error: "Message must be between 20 and 2000 characters." },
      { status: 400 },
    );
  }

  const recaptchaResult = await verifyRecaptcha({
    token: recaptchaToken,
    remoteIp: ip,
  });

  if (!recaptchaResult.ok) {
    return NextResponse.json({ error: recaptchaResult.reason }, { status: 400 });
  }

  try {
    await sendEmail({
      name,
      email,
      message,
      submittedAt: new Date(),
    });
    return NextResponse.json({ message: "Thanks, your message was sent successfully." }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Email service is not available right now.",
      },
      { status: 500 },
    );
  }
}

