"use client";

import { FormEvent, startTransition, useState } from "react";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const name = data.get("name")?.toString().trim() ?? "";
    const email = data.get("email")?.toString().trim() ?? "";
    const project = data.get("project")?.toString().trim() ?? "";
    const message = data.get("message")?.toString().trim() ?? "";
    const company = data.get("company")?.toString().trim() ?? "";

    startTransition(() => {
      setIsSubmitting(true);
      setStatus(null);
    });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          project,
          message,
          company
        })
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
    <form onSubmit={handleSubmit} className="grid gap-4" aria-label="Contact form">
      <input
        tabIndex={-1}
        autoComplete="off"
        name="company"
        className="hidden"
        aria-hidden="true"
      />
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
        className="magnetic-link mt-4 rounded-full bg-text px-6 py-3 text-base font-medium uppercase tracking-[0.18em] text-canvas disabled:opacity-70"
      >
        <span className="magnetic-link__inner">{isSubmitting ? "Sending..." : "Send Enquiry"}</span>
      </button>
      {status ? (
        <p className={status.type === "success" ? "text-sm text-[#1f7a3d]" : "text-sm text-[#b42318]"}>
          {status.message}
        </p>
      ) : null}
    </form>
  );
}
