import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Icon, type IconName } from './Icon'
import { Button, Note, Section } from './ui'
import { CONTACT } from '../data/profile'
import {
  isEmailConfigured,
  mailtoHref,
  sendContactEmail,
  type ContactPayload,
} from '../lib/email'

type FormValues = {
  name: string
  email: string
  subject: string
  message: string
}

type Status = 'idle' | 'sending' | 'sent' | 'error'

/** Small inline spinner shown while the EmailJS request is in flight. */
function Spinner() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-4 animate-spin"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
    >
      <path d="M21 12a9 9 0 1 1-6.2-8.56" />
    </svg>
  )
}

/**
 * Sends through EmailJS when it is configured (see .env.example), and falls
 * back to a prefilled `mailto:` otherwise — or when the API rejects the send.
 * The fallback is offered as a real action button rather than forced on the
 * visitor, and the direct email / phone / WhatsApp links on the right remain
 * the permanent safety net (docs/prompt_portfolio.md).
 */
export function Contact() {
  const { t } = useTranslation()
  const [status, setStatus] = useState<Status>('idle')
  const [fallbackHref, setFallbackHref] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()

  const onSubmit = async (values: FormValues) => {
    setStatus('sending')
    setFallbackHref(null)

    const payload: ContactPayload = {
      name: values.name,
      email: values.email,
      subject: values.subject,
      message: values.message,
    }

    if (isEmailConfigured()) {
      const accepted = await sendContactEmail(payload)
      if (accepted) {
        setStatus('sent')
        return
      }
      setStatus('error')
      setFallbackHref(mailtoHref(payload, CONTACT.email, t('contact.formTitle')))
      return
    }

    // EmailJS not configured in this deployment: open the visitor's mail
    // client with everything prefilled, as before.
    window.location.assign(mailtoHref(payload, CONTACT.email, t('contact.formTitle')))
    setStatus('sent')
  }

  const direct: { icon: IconName; label: string; value: string; href?: string; external?: boolean }[] = [
    { icon: 'mail', label: t('contact.emailLabel'), value: CONTACT.email, href: `mailto:${CONTACT.email}` },
    { icon: 'phone', label: t('contact.phoneLabel'), value: CONTACT.phoneDisplay, href: CONTACT.phoneHref },
    { icon: 'messageCircle', label: t('contact.whatsappLabel'), value: CONTACT.phoneDisplay, href: CONTACT.whatsappHref, external: true },
    { icon: 'codeXml', label: t('contact.githubLabel'), value: 'github.com/Zaraniaina', href: CONTACT.githubHref, external: true },
    { icon: 'mapPin', label: t('contact.locationLabel'), value: CONTACT.location },
  ]

  const errorFor = (field: keyof FormValues): string | undefined => {
    if (!errors[field]) return undefined
    if (errors[field]?.type === 'required') return t('contact.required')
    if (field === 'email') return t('contact.invalidEmail')
    return t('contact.tooShort')
  }

  const fieldClass = (field: keyof FormValues) =>
    [
      'mt-1.5 w-full rounded-[10px] border bg-surface px-4 py-3 text-ink',
      'placeholder:text-muted/70 focus:border-accent focus:outline-none',
      errors[field] ? 'border-error' : 'border-border',
    ].join(' ')

  return (
    <Section id="contact" title={t('contact.title')} lead={t('contact.lead')} alt icon="mail">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-7">
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="text-[0.9375rem] font-semibold text-ink">
                  {t('contact.name')}
                </label>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  placeholder={t('contact.namePlaceholder')}
                  aria-invalid={errors.name ? true : undefined}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  className={fieldClass('name')}
                  {...register('name', { required: true })}
                />
                {errorFor('name') ? (
                  <p id="name-error" className="mt-1.5 flex items-center gap-1.5 text-[0.875rem] text-error">
                    <Icon name="circleAlert" size={16} />
                    {errorFor('name')}
                  </p>
                ) : null}
              </div>

              <div>
                <label htmlFor="email" className="text-[0.9375rem] font-semibold text-ink">
                  {t('contact.email')}
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder={t('contact.emailPlaceholder')}
                  aria-invalid={errors.email ? true : undefined}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className={fieldClass('email')}
                  {...register('email', {
                    required: true,
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'invalid' },
                  })}
                />
                {errorFor('email') ? (
                  <p id="email-error" className="mt-1.5 flex items-center gap-1.5 text-[0.875rem] text-error">
                    <Icon name="circleAlert" size={16} />
                    {errorFor('email')}
                  </p>
                ) : null}
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="text-[0.9375rem] font-semibold text-ink">
                {t('contact.subject')}
              </label>
              <input
                id="subject"
                type="text"
                placeholder={t('contact.subjectPlaceholder')}
                className={fieldClass('subject')}
                {...register('subject')}
              />
            </div>

            <div>
              <label htmlFor="message" className="text-[0.9375rem] font-semibold text-ink">
                {t('contact.message')}
              </label>
              <textarea
                id="message"
                rows={5}
                placeholder={t('contact.messagePlaceholder')}
                aria-invalid={errors.message ? true : undefined}
                aria-describedby={errors.message ? 'message-error' : undefined}
                className={`${fieldClass('message')} resize-y`}
                {...register('message', { required: true, minLength: { value: 10, message: 'short' } })}
              />
              {errorFor('message') ? (
                <p id="message-error" className="mt-1.5 flex items-center gap-1.5 text-[0.875rem] text-error">
                  <Icon name="circleAlert" size={16} />
                  {errorFor('message')}
                </p>
              ) : null}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Button type="submit" icon="send" disabled={status === 'sending'}>
                {status === 'sending' ? (
                  <>
                    <Spinner />
                    {t('contact.sending')}
                  </>
                ) : (
                  t('contact.submit')
                )}
              </Button>
            </div>

            {status === 'sent' ? <Note tone="success">{t('contact.sentDetail')}</Note> : null}
            {status === 'error' ? (
              <Note tone="error">{t('contact.errorGeneric')}</Note>
            ) : null}
            {status === 'error' && fallbackHref ? (
              <a
                href={fallbackHref}
                className="inline-flex min-h-11 items-center gap-2 text-[0.9375rem] font-semibold text-accent underline-offset-4 transition-colors duration-150 hover:text-accent-hover hover:underline"
              >
                <Icon name="mail" size={18} />
                {t('contact.openMailApp')}
              </a>
            ) : null}
          </form>
        </div>

        <aside className="md:col-span-5">
          <div className="rounded-[14px] border border-border bg-surface p-6">
            <h3 className="text-[0.9375rem] font-semibold text-muted">{t('contact.directTitle')}</h3>
            <ul className="mt-4 space-y-1">
              {direct.map((entry) => {
                const body = (
                  <>
                    <Icon name={entry.icon} size={20} className="shrink-0 text-accent-deco" />
                    <span className="min-w-0 flex-1">
                      <span className="block text-[0.8125rem] text-muted">{entry.label}</span>
                      <span className="block truncate text-ink">{entry.value}</span>
                    </span>
                  </>
                )

                return (
                  <li key={entry.label}>
                    {entry.href ? (
                      <a
                        href={entry.href}
                        {...(entry.external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
                        className="flex min-h-11 items-center gap-3 rounded-[10px] px-2 transition-colors duration-150 hover:bg-accent-soft"
                      >
                        {body}
                      </a>
                    ) : (
                      <div className="flex min-h-11 items-center gap-3 px-2">{body}</div>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        </aside>
      </div>
    </Section>
  )
}
