/**
 * Thin EmailJS client with a clean mailto: fallback.
 *
 * Credentials come from Vite env vars (see .env.example). Only the service ID
 * is committed (docs/emailJS.md); the template ID and public key must be
 * provided via `.env.local`. When either is missing, `isEmailConfigured()`
 * returns false and the form silently falls back to the prefilled `mailto:`
 * behaviour — nothing is invented, nothing breaks
 * (docs/prompt_portfolio.md: « n'invente aucune donnée »).
 *
 * All browser API access is guarded (localStorage-style try/catch rule).
 */
import emailjs from '@emailjs/browser'

const SERVICE_ID = 'service_cganejd' // docs/emailJS.md
const TEMPLATE_ID: string = import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? ''
const PUBLIC_KEY: string = import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? ''

export type ContactPayload = {
  name: string
  email: string
  subject: string
  message: string
}

export function isEmailConfigured(): boolean {
  return Boolean(TEMPLATE_ID && PUBLIC_KEY)
}

/** Params commonly mapped by an EmailJS template. Adjust names in the dashboard if yours differ. */
function toTemplateParams(payload: ContactPayload) {
  return {
    from_name: payload.name,
    from_email: payload.email,
    reply_to: payload.email,
    subject: payload.subject,
    message: payload.message,
  }
}

/**
 * Sends through EmailJS. Returns true when the API accepted the message.
 * Throws only for unexpected programming errors; network/service failures
 * resolve to `false` so the caller can switch to the fallback.
 */
export async function sendContactEmail(payload: ContactPayload): Promise<boolean> {
  if (!isEmailConfigured()) return false
  try {
    await emailjs.send(SERVICE_ID, TEMPLATE_ID, toTemplateParams(payload), {
      publicKey: PUBLIC_KEY,
    })
    return true
  } catch {
    return false
  }
}

/** Builds the mailto: fallback URL used when EmailJS is unavailable or fails. */
export function mailtoHref(payload: ContactPayload, recipient: string, subjectFallback: string): string {
  const body = `${payload.message}\n\n—\n${payload.name}\n${payload.email}`
  return `mailto:${recipient}?subject=${encodeURIComponent(
    payload.subject || subjectFallback,
  )}&body=${encodeURIComponent(body)}`
}
