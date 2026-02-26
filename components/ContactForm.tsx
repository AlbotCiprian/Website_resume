"use client";

import { Loader2, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

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

const initialState: FormState = {
  name: "",
  email: "",
  message: "",
  website: "",
};

export function ContactForm() {
  const { dictionary } = useI18n();
  const [form, setForm] = useState<FormState>(initialState);
  const [isSubmitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Input
          required
          placeholder={dictionary.contactForm.namePlaceholder}
          value={form.name}
          onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
          minLength={2}
          maxLength={80}
          name="name"
        />
        <Input
          required
          type="email"
          placeholder={dictionary.contactForm.emailPlaceholder}
          value={form.email}
          onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
          minLength={5}
          maxLength={160}
          name="email"
        />
      </div>

      <Input
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
        name="website"
        value={form.website}
        onChange={(event) => setForm((prev) => ({ ...prev, website: event.target.value }))}
      />

      <Textarea
        required
        placeholder={dictionary.contactForm.messagePlaceholder}
        minLength={20}
        maxLength={2000}
        name="message"
        value={form.message}
        onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
      />

      <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {dictionary.contactForm.sending}
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            {dictionary.contactForm.send}
          </>
        )}
      </Button>
    </form>
  );
}
