"use client";

import { Loader2, Send } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { toast } from "sonner";

import type { Dictionary } from "@/lib/i18n";
import { useI18n } from "@/components/providers/language-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type FormState = {
  name: string;
  email: string;
  message: string;
  website: string;
};

declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
      enterprise?: {
        ready: (callback: () => void) => void;
        execute: (siteKey: string, options: { action: string }) => Promise<string>;
      };
    };
  }
}

const initialState: FormState = {
  name: "",
  email: "",
  message: "",
  website: "",
};

const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_V3_SITE_KEY ?? "";
const recaptchaUseEnterprise = process.env.NEXT_PUBLIC_RECAPTCHA_USE_ENTERPRISE === "true";
const recaptchaAction = "contact_form_submit";

function loadRecaptchaScript({
  onLoad,
  onError,
}: {
  onLoad: () => void;
  onError: () => void;
}) {
  if (!recaptchaSiteKey || typeof window === "undefined") {
    return;
  }

  const existing = document.querySelector<HTMLScriptElement>("script[data-recaptcha='v3']");
  if (existing) {
    if (window.grecaptcha) {
      onLoad();
      return;
    }
    existing.addEventListener("load", onLoad, { once: true });
    existing.addEventListener("error", onError, { once: true });
    return;
  }

  const script = document.createElement("script");
  script.src = `https://www.google.com/recaptcha/${recaptchaUseEnterprise ? "enterprise.js" : "api.js"}?render=${recaptchaSiteKey}`;
  script.async = true;
  script.defer = true;
  script.dataset.recaptcha = "v3";
  script.addEventListener("load", onLoad, { once: true });
  script.addEventListener("error", onError, { once: true });
  document.head.appendChild(script);
}

async function createRecaptchaToken({
  scriptBlocked,
  dictionary,
}: {
  scriptBlocked: boolean;
  dictionary: Dictionary;
}): Promise<string> {
  if (!recaptchaSiteKey) {
    throw new Error("Missing NEXT_PUBLIC_RECAPTCHA_V3_SITE_KEY configuration.");
  }
  if (scriptBlocked) {
    throw new Error(dictionary.contactForm.disableAdblock);
  }
  if (typeof window === "undefined" || !window.grecaptcha) {
    throw new Error(dictionary.contactForm.recaptchaLoading);
  }

  const ready = recaptchaUseEnterprise
    ? window.grecaptcha.enterprise?.ready ?? window.grecaptcha.ready
    : window.grecaptcha.ready;

  if (typeof ready !== "function") {
    throw new Error(dictionary.contactForm.disableAdblock);
  }

  return new Promise<string>((resolve, reject) => {
    ready(async () => {
      try {
        const execute = recaptchaUseEnterprise
          ? window.grecaptcha?.enterprise?.execute
          : window.grecaptcha?.execute;

        if (!execute) {
          reject(new Error(dictionary.contactForm.disableAdblock));
          return;
        }

        const token = await execute(recaptchaSiteKey, { action: recaptchaAction });
        resolve(token);
      } catch (error) {
        reject(error);
      }
    });
  });
}

/**
 * ContactForm — retro terminal-styled form with accessible labels.
 *
 * Each field has a real `<label>` (visible mono caption above the input).
 * The honeypot field is properly hidden via aria-hidden + tabindex=-1 and
 * is no longer styled to look like a real input. The submit button reads
 * like a command: `> SEND TRANSMISSION`.
 */
export function ContactForm() {
  const { dictionary } = useI18n();
  const [form, setForm] = useState<FormState>(initialState);
  const [isSubmitting, setSubmitting] = useState(false);
  const [recaptchaScriptBlocked, setRecaptchaScriptBlocked] = useState(false);
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);

  const nameId = useId();
  const emailId = useId();
  const messageId = useId();

  useEffect(() => {
    loadRecaptchaScript({
      onLoad: () => {
        setRecaptchaLoaded(true);
        setRecaptchaScriptBlocked(false);
      },
      onError: () => {
        setRecaptchaScriptBlocked(true);
      },
    });

    const timeout = window.setTimeout(() => {
      if (!window.grecaptcha) {
        setRecaptchaScriptBlocked(true);
      }
    }, 4500);

    return () => window.clearTimeout(timeout);
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);

    try {
      const recaptchaToken = await createRecaptchaToken({
        scriptBlocked: recaptchaScriptBlocked || (!recaptchaLoaded && !window.grecaptcha),
        dictionary,
      });

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, recaptchaToken }),
      });

      const data = (await response.json()) as { message?: string; error?: string };

      if (!response.ok) {
        throw new Error(data.error ?? dictionary.contactForm.failed);
      }

      toast.success(data.message ?? dictionary.contactForm.success);
      setForm(initialState);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : dictionary.contactForm.failed);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 md:grid-cols-2">
        <Field
          id={nameId}
          label={dictionary.contactForm.namePlaceholder}
          mono="param.name"
        >
          <Input
            id={nameId}
            required
            value={form.name}
            onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
            minLength={2}
            maxLength={80}
            name="name"
            autoComplete="name"
          />
        </Field>

        <Field
          id={emailId}
          label={dictionary.contactForm.emailPlaceholder}
          mono="param.email"
        >
          <Input
            id={emailId}
            required
            type="email"
            value={form.email}
            onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
            minLength={5}
            maxLength={160}
            name="email"
            autoComplete="email"
          />
        </Field>
      </div>

      {/* Honeypot — hidden from users and assistive tech, but available to bots */}
      <input
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        name="website"
        value={form.website}
        onChange={(event) => setForm((prev) => ({ ...prev, website: event.target.value }))}
        style={{ position: "absolute", left: "-10000px", width: 1, height: 1, opacity: 0 }}
      />

      <Field
        id={messageId}
        label={dictionary.contactForm.messagePlaceholder}
        mono="param.message"
      >
        <Textarea
          id={messageId}
          required
          minLength={20}
          maxLength={2000}
          name="message"
          value={form.message}
          onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
        />
      </Field>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-sm bg-accent text-canvas hover:bg-accent-warning md:w-auto"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {dictionary.contactForm.sending}
          </>
        ) : (
          <>
            <span className="mono mr-2 text-canvas/70">{">"}</span>
            <Send className="mr-2 h-4 w-4" />
            {dictionary.contactForm.send}
          </>
        )}
      </Button>
    </form>
  );
}

/**
 * Field — labelled mono caption above the input.
 */
function Field({
  id,
  label,
  mono,
  children,
}: {
  id: string;
  label: string;
  mono: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="mono flex items-center gap-2 text-[10.5px] tracking-[0.18em] text-ink-mono uppercase">
        <span aria-hidden className="text-ink-faint">{">"}</span>
        <span>{mono}</span>
        <span aria-hidden className="text-ink-faint">·</span>
        <span className="text-ink-soft">{label}</span>
      </label>
      {children}
    </div>
  );
}
