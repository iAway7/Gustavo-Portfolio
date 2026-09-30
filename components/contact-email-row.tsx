"use client";

import { useState } from "react";

const EMAIL_USER = ["gustavo", ".", "polin"].join("");
const EMAIL_DOMAIN = ["gmail", "com"].join(".");
const EMAIL = `${EMAIL_USER}@${EMAIL_DOMAIN}`;

export function ContactEmailRow() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleReveal = () => {
    setIsRevealed(true);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setIsCopied(true);
      window.setTimeout(() => setIsCopied(false), 1600);
    } catch {
      setIsCopied(false);
    }
  };

  return (
    <div className="contact-link">
      <span>Email</span>
      <div className="flex items-center gap-3">
        {isRevealed ? (
          <>
            <a href={`mailto:${EMAIL}`} className="text-muted transition-colors hover:text-accent">
              {EMAIL}
            </a>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex min-h-10 items-center rounded-full border border-line px-4 py-1 text-xs uppercase tracking-[0.14em] text-muted transition-colors hover:text-accent"
            >
              {isCopied ? "Copied" : "Copy"}
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={handleReveal}
            className="inline-flex min-h-10 items-center rounded-full border border-line px-4 py-1 text-xs uppercase tracking-[0.14em] text-muted transition-colors hover:text-accent"
          >
            Reveal email
          </button>
        )}
      </div>
    </div>
  );
}
