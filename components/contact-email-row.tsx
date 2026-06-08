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
            <a href={`mailto:${EMAIL}`} className="text-muted transition-colors hover:text-[#244de8]">
              {EMAIL}
            </a>
            <button
              type="button"
              onClick={handleCopy}
              className="rounded-full border border-line px-3 py-1 text-xs uppercase tracking-[0.14em] text-muted transition-colors hover:text-[#244de8]"
            >
              {isCopied ? "Copied" : "Copy"}
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={handleReveal}
            className="rounded-full border border-line px-3 py-1 text-xs uppercase tracking-[0.14em] text-muted transition-colors hover:text-[#244de8]"
          >
            Reveal email
          </button>
        )}
      </div>
    </div>
  );
}
