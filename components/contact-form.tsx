"use client";

import Script from "next/script";
import { FormEvent, startTransition, useState } from "react";

import { getDict, type Locale } from "@/lib/i18n";

type ContactFormValues = {
  company: string;
  email: string;
  message: string;
  name: string;
  project: string;
};

type ContactFormErrors = Partial<Record<keyof Omit<ContactFormValues, "company" | "project">, string>>;

type FormStrings = ReturnType<typeof getDict>["contact"]["form"];

function validate(values: ContactFormValues, t: FormStrings): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (!values.name) {
    errors.name = t.errName;
  }

  if (!values.email) {
    errors.email = t.errEmail;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = t.errEmailValid;
  }

  if (!values.message) {
    errors.message = t.errMessage;
  }

  return errors;
}

export function ContactForm({ locale = "en" }: { locale?: Locale }) {
  const t = getDict(locale).contact.form;
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
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
    const turnstileToken = data.get("cf-turnstile-response")?.toString().trim() ?? "";
    const nextErrors = validate(values, t);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus({
        type: "error",
        message: t.errorGeneric
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
        body: JSON.stringify({
          ...values,
          turnstileToken
        })
      });

      const result = (await response.json()) as { error?: string; ok?: boolean };

      if (!response.ok || !result.ok) {
        throw new Error(result.error || "send-failed");
      }

      form.reset();
      setStatus({
        type: "success",
        message: t.success
      });
    } catch {
      setStatus({
        type: "error",
        message: t.errorSend
      });
    }

    startTransition(() => {
      setIsSubmitting(false);
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="grid gap-4"
      aria-label={locale === "es" ? "Formulario de contacto" : "Contact form"}
    >
      {turnstileSiteKey ? (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="afterInteractive"
        />
      ) : null}
      <input
        tabIndex={-1}
        autoComplete="off"
        name="company"
        className="hidden"
        aria-hidden="true"
        suppressHydrationWarning
      />
      <label className="grid gap-2">
        <span className="text-sm text-muted">
          {t.name} <span aria-hidden="true" className="text-text">*</span>
          <span className="sr-only">{t.required}</span>
        </span>
        <input
          required
          name="name"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
          onChange={() => setErrors((current) => ({ ...current, name: undefined }))}
          className="rounded-[1.2rem] border border-line bg-panel/60 px-4 py-3 outline-none transition-colors duration-300 focus:border-text/30"
          suppressHydrationWarning
        />
        {errors.name ? (
          <p id="contact-name-error" role="alert" className="text-sm text-[#b42318]">
            {errors.name}
          </p>
        ) : null}
      </label>
      <label className="grid gap-2">
        <span className="text-sm text-muted">
          {t.email} <span aria-hidden="true" className="text-text">*</span>
          <span className="sr-only">{t.required}</span>
        </span>
        <input
          required
          type="email"
          name="email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
          onChange={() => setErrors((current) => ({ ...current, email: undefined }))}
          className="rounded-[1.2rem] border border-line bg-panel/60 px-4 py-3 outline-none transition-colors duration-300 focus:border-text/30"
          suppressHydrationWarning
        />
        {errors.email ? (
          <p id="contact-email-error" role="alert" className="text-sm text-[#b42318]">
            {errors.email}
          </p>
        ) : null}
      </label>
      <label className="grid gap-2">
        <span className="text-sm text-muted">{t.project}</span>
        <input
          name="project"
          className="rounded-[1.2rem] border border-line bg-panel/60 px-4 py-3 outline-none transition-colors duration-300 focus:border-text/30"
          suppressHydrationWarning
        />
      </label>
      <label className="grid gap-2">
        <span className="text-sm text-muted">
          {t.message} <span aria-hidden="true" className="text-text">*</span>
          <span className="sr-only">{t.required}</span>
        </span>
        <textarea
          required
          name="message"
          rows={6}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          onChange={() => setErrors((current) => ({ ...current, message: undefined }))}
          className="rounded-[1.2rem] border border-line bg-panel/60 px-4 py-3 outline-none transition-colors duration-300 focus:border-text/30"
          suppressHydrationWarning
        />
        {errors.message ? (
          <p id="contact-message-error" role="alert" className="text-sm text-[#b42318]">
            {errors.message}
          </p>
        ) : null}
      </label>
      {turnstileSiteKey ? (
        <div
          className="cf-turnstile"
          data-sitekey={turnstileSiteKey}
          data-theme="light"
          data-size="flexible"
        />
      ) : null}
      <div className="mt-4 flex justify-start">
        <button
          type="submit"
          disabled={isSubmitting}
          data-cursor="link"
          className="magnetic-link rounded-full bg-text px-10 py-3 text-base font-medium text-canvas disabled:opacity-70"
        >
          <span className="magnetic-link__inner">{isSubmitting ? t.sending : t.send}</span>
        </button>
      </div>
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
