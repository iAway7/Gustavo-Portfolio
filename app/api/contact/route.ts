import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const fromEmail = process.env.CONTACT_FROM_EMAIL ?? "gustavo@gpolin.com";
const toEmail = process.env.CONTACT_TO_EMAIL ?? "gustavo.polin@gmail.com";

const resend = resendApiKey ? new Resend(resendApiKey) : null;

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function POST(request: Request) {
  if (!resend) {
    return Response.json(
      {
        error: "Email service is not configured yet."
      },
      { status: 500 }
    );
  }

  try {
    const body = (await request.json()) as {
      company?: string;
      email?: string;
      message?: string;
      name?: string;
      project?: string;
    };

    const company = body.company?.trim() ?? "";
    const name = body.name?.trim() ?? "";
    const email = body.email?.trim() ?? "";
    const project = body.project?.trim() ?? "";
    const message = body.message?.trim() ?? "";

    if (company) {
      return Response.json({ ok: true });
    }

    if (!name || !email || !message) {
      return Response.json(
        {
          error: "Name, email, and message are required."
        },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return Response.json(
        {
          error: "Please enter a valid email address."
        },
        { status: 400 }
      );
    }

    const emailSubject = `Portfolio enquiry from ${name}`;
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeProject = escapeHtml(project);
    const safeMessage = escapeHtml(message);
    const projectLine = project ? `<p><strong>Project:</strong> ${safeProject}</p>` : "";

    const { error } = await resend.emails.send({
      from: `Gustavo Polin Portfolio <${fromEmail}>`,
      to: [toEmail],
      replyTo: email,
      subject: emailSubject,
      text: [`Name: ${name}`, `Email: ${email}`, project ? `Project: ${project}` : null, "", message]
        .filter(Boolean)
        .join("\n"),
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
          <h2 style="margin-bottom: 16px;">New portfolio enquiry</h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          ${projectLine}
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${safeMessage}</p>
        </div>
      `
    });

    if (error) {
      return Response.json(
        {
          error: "Resend could not deliver this message."
        },
        { status: 502 }
      );
    }

    return Response.json({ ok: true });
  } catch {
    return Response.json(
      {
        error: "Unable to send your message right now."
      },
      { status: 500 }
    );
  }
}
