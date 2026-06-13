"use client";

import { FormEvent, startTransition, useState } from "react";

type ContactFormValues = {
  company: string;
  email: string;
  message: string;
  name: string;
  project: string;
};

type ContactFormErrors = Partial<Record<keyof Omit<ContactFormValues, "company" | "project">, string>>;

function validate(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (!values.name) {
    errors.name = "Please enter your name.";
  }

  if (!values.email) {
    errors.email = "Please enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.message) {
    errors.message = "Please enter a short message.";
  }

  return errors;
}

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [errors, setErrors] = useState<ContactFormErrors>({});

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const values: ContactFormValues = {
      name: data.get("name")?.toString().trim() ?? "",
      email: data.get("email")?.toString().trim() ?? "",
      project: data.get("project")?.toString().trim() ?? "",
      message: data.get("message")?.toString().trim() ?? "",
      company: data.get("company")?.toString().trim() ?? ""
    };
    const nextErrors = validate(values);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus({
        type: "error",
        message: "Please correct the highlighted fields and try again."
      });

      const firstInvalid = Object.keys(nextErrors)[0];
      form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    startTransition(() => {
      setIsSubmitting(true);
      setStatus(null);
    });
    setErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
      });

      const result = (await response.json()) as { error?: string; ok?: boolean };

      if (!response.ok || !result.ok) {
        throw new Error(result.error || "Unable to send your message right now.");
      }

      form.reset();
      setStatus({
        type: "success",
        message: "Thanks. Your message was sent successfully."
      });
    } catch (error) {
      const messageText = error instanceof Error ? error.message : "Unable to send your message right now.";
      setStatus({
        type: "error",
        message: messageText
      });
    }

    startTransition(() => {
      setIsSubmitting(false);
    });
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-4" aria-label="Contact form">
      <input
        tabIndex={-1}
        autoComplete="off"
        name="company"
        className="hidden"
        aria-hidden="true"
      />
      <label className="grid gap-2">
        <span className="text-sm text-muted">
          Name <span aria-hidden="true" className="text-text">*</span>
          <span className="sr-only">required</span>
        </span>
        <input
          required
          name="name"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
          onChange={() => setErrors((current) => ({ ...current, name: undefined }))}
          className="rounded-[1.2rem] border border-line bg-panel/60 px-4 py-3 outline-none transition-colors duration-300 focus:border-text/30"
        />
        {errors.name ? (
          <p id="contact-name-error" role="alert" className="text-sm text-[#b42318]">
            {errors.name}
          </p>
        ) : null}
      </label>
      <label className="grid gap-2">
        <span className="text-sm text-muted">
          Email <span aria-hidden="true" className="text-text">*</span>
          <span className="sr-only">required</span>
        </span>
        <input
          required
          type="email"
          name="email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
          onChange={() => setErrors((current) => ({ ...current, email: undefined }))}
          className="rounded-[1.2rem] border border-line bg-panel/60 px-4 py-3 outline-none transition-colors duration-300 focus:border-text/30"
        />
        {errors.email ? (
          <p id="contact-email-error" role="alert" className="text-sm text-[#b42318]">
            {errors.email}
          </p>
        ) : null}
      </label>
      <label className="grid gap-2">
        <span className="text-sm text-muted">Project (Optional)</span>
        <input
          name="project"
          className="rounded-[1.2rem] border border-line bg-panel/60 px-4 py-3 outline-none transition-colors duration-300 focus:border-text/30"
        />
      </label>
      <label className="grid gap-2">
        <span className="text-sm text-muted">
          Message <span aria-hidden="true" className="text-text">*</span>
          <span className="sr-only">required</span>
        </span>
        <textarea
          required
          name="message"
          rows={6}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          onChange={() => setErrors((current) => ({ ...current, message: undefined }))}
          className="rounded-[1.2rem] border border-line bg-panel/60 px-4 py-3 outline-none transition-colors duration-300 focus:border-text/30"
        />
        {errors.message ? (
          <p id="contact-message-error" role="alert" className="text-sm text-[#b42318]">
            {errors.message}
          </p>
        ) : null}
      </label>
      <button
        type="submit"
        disabled={isSubmitting}
        data-cursor="link"
        className="magnetic-link mt-4 rounded-full bg-text px-6 py-3 text-base font-medium uppercase tracking-[0.18em] text-canvas disabled:opacity-70"
      >
        <span className="magnetic-link__inner">{isSubmitting ? "Sending..." : "Send"}</span>
      </button>
      {status ? (
        <p
          role="status"
          aria-live="polite"
          className={status.type === "success" ? "text-sm text-[#1f7a3d]" : "text-sm text-[#b42318]"}
        >
          {status.message}
        </p>
      ) : null}
    </form>
  );
}
