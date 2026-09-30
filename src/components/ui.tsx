import type { ReactNode } from 'react'
import { Icon, type IconName } from './Icon'

/* ---------------------------------------------------------------------------
   Section rhythm — design.md §4: 96px between sections on desktop, 64px on
   mobile; content capped at 1100px.
   --------------------------------------------------------------------------- */

type SectionProps = {
  id: string
  title: string
  lead?: string
  children: ReactNode
  /** Alternating sections swap to `--surface-alt` (design.md §5). */
  alt?: boolean
  icon?: IconName
}

export function Section({ id, title, lead, children, alt = false, icon }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`scroll-mt-24 py-16 md:py-24 ${alt ? 'band-alt' : ''}`}
    >
      <div className="shell">
        <header className="mb-10 md:mb-14">
          <div className="flex items-center gap-2.5 text-accent-deco">
            {icon ? <Icon name={icon} size={28} /> : null}
            {/* The only H1 on the page lives in the hero; sections are H2. */}
            <h2 id={`${id}-title`} className="text-[2rem] leading-[1.2]">
              {title}
            </h2>
          </div>
          {lead ? <p className="measure mt-4 text-muted">{lead}</p> : null}
        </header>
        {children}
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------------------
   Buttons — design.md §7. 44px minimum height, 20px horizontal padding, icon
   to the left of the label with an 8px gap, no trailing arrow.
   --------------------------------------------------------------------------- */

type ButtonVariant = 'primary' | 'secondary' | 'discreet'

const BUTTON_BASE =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-[10px] px-5 text-[0.9375rem] font-semibold ' +
  'transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-60'

const BUTTON_VARIANTS: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-surface hover:bg-accent-hover',
  secondary: 'border border-accent text-accent hover:bg-accent-soft',
  discreet: 'text-ink hover:bg-accent-soft',
}

type ButtonLinkProps = {
  href: string
  variant?: ButtonVariant
  icon?: IconName
  children: ReactNode
  className?: string
  external?: boolean
  onClick?: () => void
  'aria-label'?: string
}

export function ButtonLink({
  href,
  variant = 'primary',
  icon,
  children,
  className = '',
  external = false,
  onClick,
  'aria-label': ariaLabel,
}: ButtonLinkProps) {
  return (
    <a
      href={href}
      className={`${BUTTON_BASE} ${BUTTON_VARIANTS[variant]} ${className}`}
      onClick={onClick}
      aria-label={ariaLabel}
      {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
    >
      {icon ? <Icon name={icon} size={18} /> : null}
      <span>{children}</span>
    </a>
  )
}

type ButtonProps = {
  variant?: ButtonVariant
  icon?: IconName
  children: ReactNode
  type?: 'button' | 'submit'
  className?: string
  disabled?: boolean
  onClick?: () => void
}

export function Button({
  variant = 'primary',
  icon,
  children,
  type = 'button',
  className = '',
  disabled,
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${BUTTON_BASE} ${BUTTON_VARIANTS[variant]} ${className}`}
    >
      {icon ? <Icon name={icon} size={18} /> : null}
      <span>{children}</span>
    </button>
  )
}

/* ---------------------------------------------------------------------------
   Technology badge — design.md §7. Radius 999px, padding 4px/12px, 0.875rem.
   The lavender variant distinguishes the AI domain.
   --------------------------------------------------------------------------- */

export function Badge({ children, tone }: { children: ReactNode; tone?: 'lavender' }) {
  return (
    <span
      className={[
        'inline-flex items-center rounded-full px-3 py-1 font-mono text-[0.8125rem] leading-5',
        tone === 'lavender'
          ? 'bg-lavender-soft text-lavender-ink'
          : 'bg-accent-soft text-accent',
      ].join(' ')}
    >
      {children}
    </span>
  )
}

/** Section-level list of badges, wrapping naturally. */
export function BadgeGroup({ children }: { children: ReactNode }) {
  return <ul className="flex flex-wrap gap-2">{children}</ul>
}

export function BadgeItem({ children, tone }: { children: ReactNode; tone?: 'lavender' }) {
  return (
    <li>
      <Badge tone={tone}>{children}</Badge>
    </li>
  )
}

/* ---------------------------------------------------------------------------
   Status message — design.md §7 and §10: never colour alone, always an icon
   plus text that says what to do.
   --------------------------------------------------------------------------- */

type NoteProps = {
  tone: 'success' | 'error'
  children: ReactNode
}

export function Note({ tone, children }: NoteProps) {
  const styles =
    tone === 'success'
      ? 'border-success/40 bg-success/10 text-ink'
      : 'border-error/40 bg-error/10 text-ink'

  return (
    <p
      role="status"
      aria-live="polite"
      className={`flex items-start gap-2.5 rounded-[10px] border px-4 py-3 text-[0.9375rem] ${styles}`}
    >
      <Icon
        name={tone === 'success' ? 'circleCheck' : 'circleAlert'}
        size={18}
        className={tone === 'success' ? 'text-success' : 'text-error'}
      />
      <span>{children}</span>
    </p>
  )
}

/** The single card surface used across projects, skills and contact. */
export function Card({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`rounded-[14px] border border-border bg-surface p-6 shadow-soft md:p-7 ${className}`}
    >
      {children}
    </div>
  )
}
