import { Resend } from "resend";

import { ContactConfirmationEmail } from "@/emails/contact-confirmation-email";
import { ContactNotificationEmail } from "@/emails/contact-notification-email";

export const runtime = "nodejs";

const resendApiKey = process.env.RESEND_API_KEY;
const fromEmail =
  process.env.RESEND_FROM_EMAIL ?? process.env.CONTACT_FROM_EMAIL ?? "hello@gpolin.com";
const toEmail = process.env.CONTACT_TO_EMAIL ?? "gustavo.polin@gmail.com";

const resend = resendApiKey ? new Resend(resendApiKey) : null;

const FIELD_LIMITS = {
  name: 100,
  email: 200,
  project: 200,
  message: 5000
} as const;

type ContactPayload = {
  name: string;
  email: string;
  project: string;
  message: string;
};

type ValidationResult =
  | { ok: true; values: ContactPayload }
  | { ok: false; error: string };

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validatePayload(body: Record<string, unknown>): ValidationResult {
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const project = typeof body.project === "string" ? body.project.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name || !email || !message) {
    return { ok: false, error: "Name, email, and message are required." };
  }

  if (!isValidEmail(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  if (
    name.length > FIELD_LIMITS.name ||
    email.length > FIELD_LIMITS.email ||
    project.length > FIELD_LIMITS.project ||
    message.length > FIELD_LIMITS.message
  ) {
    return { ok: false, error: "One of the fields is too long." };
  }

  return { ok: true, values: { name, email, project, message } };
}

/**
 * Basic per-IP rate limiting. In-memory, so it resets per serverless
 * instance on Vercel; good enough to stop casual abuse without
 * adding infrastructure.
 */
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (requestLog.get(ip) ?? []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS
  );

  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    requestLog.set(ip, recent);
    return true;
  }

  recent.push(now);
  requestLog.set(ip, recent);

  if (requestLog.size > 5000) {
    requestLog.clear();
  }

  return false;
}

function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}

function formatSubmissionDate(date: Date) {
  return `${date.toLocaleString("en-US", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "America/Chicago"
  })} (CT)`;
}

export async function POST(request: Request) {
  if (!resend) {
    return Response.json(
      { ok: false, error: "Email service is not configured yet." },
      { status: 500 }
    );
  }

  if (isRateLimited(getClientIp(request))) {
    return Response.json(
      { ok: false, error: "Too many messages. Please try again in a few minutes." },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real visitors never fill the hidden "company" field.
  // Bots that do get a fake success so they don't adapt.
  if (typeof body.company === "string" && body.company.trim()) {
    return Response.json({ ok: true });
  }

  const validation = validatePayload(body);
  if (!validation.ok) {
    return Response.json({ ok: false, error: validation.error }, { status: 400 });
  }

  const { name, email, project, message } = validation.values;
  const submittedAt = formatSubmissionDate(new Date());

  try {
    const notification = await resend.emails.send({
      from: `Gustavo Polin Portfolio <${fromEmail}>`,
      to: [toEmail],
      replyTo: email,
      subject: `New Portfolio Inquiry from ${name}`,
      react: ContactNotificationEmail({
        name,
        email,
        project: project || undefined,
        message,
        submittedAt
      }),
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        project ? `Project: ${project}` : null,
        `Submitted: ${submittedAt}`,
        "",
        message
      ]
        .filter(Boolean)
        .join("\n")
    });

    if (notification.error) {
      console.error("Resend notification failed:", notification.error);
      return Response.json(
        { ok: false, error: "Unable to send your message right now." },
        { status: 502 }
      );
    }

    // Confirmation to the visitor. If this one fails, the inquiry still
    // arrived, so we log instead of surfacing an error to the user.
    const confirmation = await resend.emails.send({
      from: `Gustavo Polin <${fromEmail}>`,
      to: [email],
      subject: "Thanks for reaching out",
      react: ContactConfirmationEmail({ name }),
      text: [
        `Hi ${name.split(/\s+/)[0] || name},`,
        "",
        "Your message arrived safely. I read every inquiry personally and will get back to you within one to two business days.",
        "",
        "In the meantime, feel free to explore my recent work at https://gpolin.com/work.",
        "",
        "Gustavo Polin",
        "Product Designer · gpolin.com"
      ].join("\n")
    });

    if (confirmation.error) {
      console.error("Resend confirmation failed:", confirmation.error);
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Contact route error:", error);
    return Response.json(
      { ok: false, error: "Unable to send your message right now." },
      { status: 500 }
    );
  }
}
