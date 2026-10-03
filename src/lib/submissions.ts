/**
 * Form submission layer — independent of any specific backend.
 *
 * If VITE_FORM_ENDPOINT is set (e.g. a Formspree/Netlify Forms/your own API
 * endpoint), submissions POST there as JSON. Otherwise they fall back to
 * opening a pre-filled mailto: draft to info@shaaqtrading.com, so the site
 * works fully out of the box with zero backend setup. See README.md to wire
 * up persistent storage (Supabase, Airtable, a simple serverless function…).
 */

const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT as string | undefined;
const CONTACT_EMAIL = "info@shaaqtrading.com";

async function send(kind: string, payload: Record<string, unknown>) {
  if (ENDPOINT) {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind, ...payload }),
    });
    if (!res.ok) throw new Error(`Submission failed (${res.status})`);
    return;
  }
  const subject = encodeURIComponent(`${kind} — ${String(payload.name ?? "New enquiry")}`);
  const lines = Object.entries(payload)
    .filter(([, v]) => v !== null && v !== undefined && v !== "")
    .map(([k, v]) => `${k}: ${typeof v === "object" ? JSON.stringify(v) : v}`);
  const body = encodeURIComponent(lines.join("\n"));
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
}

export type QuoteSubmission = {
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  garment_type: string;
  specification: Record<string, string>;
  quantity: number | null;
  sizes: string | null;
  fabric_notes: string | null;
  stitching_notes: string | null;
  logo_placement: string | null;
  message: string | null;
};

export async function submitQuoteRequest(submission: QuoteSubmission) {
  await send("Quote request", submission as Record<string, unknown>);
}

export type AppointmentSubmission = {
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  preferred_date: string;
  preferred_time: string;
  interests: string[];
  notes: string | null;
};

export async function submitAppointment(submission: AppointmentSubmission) {
  await send("Appointment request", submission as Record<string, unknown>);
}
