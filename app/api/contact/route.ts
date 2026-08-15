import { Resend } from "resend";

import { ContactConfirmationEmail } from "@/emails/contact-confirmation-email";
import { ContactNotificationEmail } from "@/emails/contact-notification-email";
import { SITE_URL } from "@/lib/seo";

export const runtime = "nodejs";

const resendApiKey = process.env.RESEND_API_KEY;
const fromEmail = process.env.RESEND_FROM_EMAIL ?? process.env.CONTACT_FROM_EMAIL ?? "";
const toEmail = process.env.CONTACT_TO_EMAIL ?? "";
const turnstileSecretKey = process.env.TURNSTILE_SECRET_KEY ?? "";

const resend = resendApiKey ? new Resend(resendApiKey) : null;

const SITE_ORIGIN = new URL(SITE_URL).origin;
const MAX_BODY_BYTES = 16 * 1024;
const ALLOWED_SITE_ORIGINS = new Set(
  [SITE_ORIGIN].flatMap((origin) => {
    const url = new URL(origin);
    const alternateHost =
      url.hostname.startsWith("www.") ? url.hostname.slice(4) : `www.${url.hostname}`;
    return [origin, `${url.protocol}//${alternateHost}${url.port ? `:${url.port}` : ""}`];
  })
);

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
  turnstileToken: string;
};

type ValidationResult =
  | { ok: true; values: ContactPayload }
  | { ok: false; error: string };

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function normalizeText(value: string) {
  return value.replace(/[\u0000-\u001f\u007f]+/g, " ").replace(/\s+/g, " ").trim();
}

function normalizeMessage(value: string) {
  return value.replace(/\r\n/g, "\n").replace(/\r/g, "\n").replace(/\u0000/g, "").trim();
}

function validatePayload(body: Record<string, unknown>): ValidationResult {
  const name = typeof body.name === "string" ? normalizeText(body.name) : "";
  const email = typeof body.email === "string" ? normalizeText(body.email).toLowerCase() : "";
  const project = typeof body.project === "string" ? normalizeText(body.project) : "";
  const message = typeof body.message === "string" ? normalizeMessage(body.message) : "";
  const turnstileToken =
    typeof body.turnstileToken === "string" ? body.turnstileToken.trim() : "";

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

  return { ok: true, values: { name, email, project, message, turnstileToken } };
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

function hasAllowedOrigin(request: Request) {
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");

  const isAllowed = (value: string) => {
    try {
      const parsed = new URL(value);
      if (ALLOWED_SITE_ORIGINS.has(parsed.origin)) {
        return true;
      }

      return (
        parsed.protocol === "http:" &&
        (parsed.hostname === "localhost" || parsed.hostname === "127.0.0.1")
      );
    } catch {
      return false;
    }
  };

  if (origin) {
    return isAllowed(origin);
  }

  if (referer) {
    return isAllowed(referer);
  }

  return false;
}

async function verifyTurnstile(token: string, ip: string) {
  if (!turnstileSecretKey) {
    return true;
  }

  if (!token) {
    return false;
  }

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      secret: turnstileSecretKey,
      response: token,
      remoteip: ip
    })
  });

  if (!response.ok) {
    return false;
  }

  const result = (await response.json()) as { success?: boolean };
  return Boolean(result.success);
}

function formatSubmissionDate(date: Date) {
  return `${date.toLocaleString("en-US", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "America/Chicago"
  })} (CT)`;
}

export async function POST(request: Request) {
  if (!resend || !fromEmail || !toEmail) {
    console.error("Contact route is not fully configured.");
    return Response.json(
      { ok: false, error: "Unable to send your message right now." },
      { status: 503 }
    );
  }

  if (request.headers.get("content-type")?.includes("application/json") !== true) {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 415 });
  }

  const contentLengthHeader = request.headers.get("content-length");
  const contentLength = Number(contentLengthHeader ?? "0");
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return Response.json({ ok: false, error: "Request is too large." }, { status: 413 });
  }

  if (!hasAllowedOrigin(request)) {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 403 });
  }

  const clientIp = getClientIp(request);
  if (isRateLimited(clientIp)) {
    return Response.json(
      { ok: false, error: "Too many messages. Please try again in a few minutes." },
      { status: 429 }
    );
  }

  let bodyText = "";
  try {
    bodyText = await request.text();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  if (new TextEncoder().encode(bodyText).byteLength > MAX_BODY_BYTES) {
    return Response.json({ ok: false, error: "Request is too large." }, { status: 413 });
  }

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(bodyText) as Record<string, unknown>;
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

  const { name, email, project, message, turnstileToken } = validation.values;
  if (!(await verifyTurnstile(turnstileToken, clientIp))) {
    return Response.json({ ok: false, error: "Unable to verify your submission." }, { status: 400 });
  }

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
    if (turnstileSecretKey) {
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
