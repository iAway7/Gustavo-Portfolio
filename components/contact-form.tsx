"use client";

import { FormEvent, startTransition, useState } from "react";

const EMAIL_USER = ["gustavo", ".", "polin"].join("");
const EMAIL_DOMAIN = ["gmail", "com"].join(".");
const EMAIL = `${EMAIL_USER}@${EMAIL_DOMAIN}`;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const name = data.get("name")?.toString().trim() ?? "";
    const email = data.get("email")?.toString().trim() ?? "";
    const project = data.get("project")?.toString().trim() ?? "";
    const message = data.get("message")?.toString().trim() ?? "";

    startTransition(() => {
      setIsSubmitting(true);
    });

    const subject = encodeURIComponent(`Portfolio enquiry from ${name || "a new client"}`);
    const body = encodeURIComponent(
      [`Name: ${name}`, `Email: ${email}`, `Project: ${project}`, "", message].join("\n")
    );

    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;

    window.setTimeout(() => {
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4" aria-label="Contact form">
      <label className="grid gap-2">
        <span className="text-sm text-muted">Name</span>
        <input
          required
          name="name"
          className="rounded-[1.2rem] border border-line bg-panel/60 px-4 py-3 outline-none transition-colors duration-300 focus:border-text/30"
        />
      </label>
      <label className="grid gap-2">
        <span className="text-sm text-muted">Email</span>
        <input
          required
          type="email"
          name="email"
          className="rounded-[1.2rem] border border-line bg-panel/60 px-4 py-3 outline-none transition-colors duration-300 focus:border-text/30"
        />
      </label>
      <label className="grid gap-2">
        <span className="text-sm text-muted">Project</span>
        <input
          name="project"
          className="rounded-[1.2rem] border border-line bg-panel/60 px-4 py-3 outline-none transition-colors duration-300 focus:border-text/30"
        />
      </label>
      <label className="grid gap-2">
        <span className="text-sm text-muted">Message</span>
        <textarea
          required
          name="message"
          rows={6}
          className="rounded-[1.2rem] border border-line bg-panel/60 px-4 py-3 outline-none transition-colors duration-300 focus:border-text/30"
        />
      </label>
      <button
        type="submit"
        disabled={isSubmitting}
        data-cursor="link"
        className="magnetic-link mt-4 rounded-full bg-text px-6 py-3 text-sm font-medium uppercase tracking-[0.18em] text-canvas disabled:opacity-70"
      >
        <span className="magnetic-link__inner">{isSubmitting ? "Preparing Email" : "Send Enquiry"}</span>
      </button>
    </form>
  );
}
