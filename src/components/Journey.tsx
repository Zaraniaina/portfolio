import { useTranslation } from 'react-i18next'
import { Icon } from './Icon'
import { Section } from './ui'
import { DEGREES, ROLES } from '../data/profile'

/** Formats an ISO `YYYY-MM` as a localised month + year. */
function formatMonth(iso: string, locale: string): string {
  const [year, month] = iso.split('-')
  const date = new Date(Number(year), Number(month) - 1, 1)
  return new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'long' }).format(date)
}

function formatYear(year: string, locale: string): string {
  return new Intl.DateTimeFormat(locale, { year: 'numeric' }).format(new Date(Number(year), 0, 1))
}

export function Journey() {
  const { t, i18n } = useTranslation()
  const locale = i18n.language?.startsWith('en') ? 'en-GB' : 'fr-FR'

  const roles = t('journey.roles', { returnObjects: true }) as Record<
    string,
    { title: string; bullets: string[] }
  >
  const degrees = t('journey.degrees', { returnObjects: true }) as Record<string, string>

  return (
    <Section id="journey" title={t('journey.title')} icon="briefcase">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
        <section aria-labelledby="journey-experience">
          <h3 id="journey-experience" className="mb-6 flex items-center gap-2.5 text-[1.125rem]">
            <Icon name="briefcase" size={24} className="text-accent-deco" />
            {t('journey.experienceTitle')}
          </h3>

          {/* §7 — vertical timeline: 1px border line with a 12px accent dot. */}
          <ol className="relative ml-1.5 border-l border-border pl-7">
            {ROLES.map((role) => {
              const data = roles[role.id]
              if (!data) return null
              const period = `${formatMonth(role.start, locale)} – ${
                role.end ? formatMonth(role.end, locale) : t('journey.present')
              }`

              return (
                <li key={role.id} className="relative pb-8 last:pb-0">
                  <span
                    aria-hidden="true"
                    className="absolute top-2 -left-[34px] size-3 rounded-full bg-accent-deco"
                  />
                  {/* §3 — small text for dates and metadata. */}
                  <p className="text-[0.875rem] text-muted">{period}</p>
                  <h4 className="mt-1 text-[1.0625rem] font-semibold">{data.title}</h4>
                  <p className="mt-1.5 flex items-center gap-1.5 text-[0.875rem] text-muted">
                    <Icon name="mapPin" size={16} className="text-accent-deco" />
                    {role.location}
                  </p>
                  <ul className="measure mt-2.5 space-y-1.5">
                    {data.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-2.5 text-[0.9375rem] text-muted">
                        <Icon name="circleCheck" size={18} className="mt-1 shrink-0 text-accent-deco" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              )
            })}
          </ol>
        </section>

        <section aria-labelledby="journey-education">
          <h3 id="journey-education" className="mb-6 flex items-center gap-2.5 text-[1.125rem]">
            <Icon name="graduationCap" size={24} className="text-accent-deco" />
            {t('journey.educationTitle')}
          </h3>

          <ol className="relative ml-1.5 border-l border-border pl-7">
            {DEGREES.map((degree) => {
              const title = degrees[degree.id]
              if (!title) return null

              return (
                <li key={degree.id} className="relative pb-7 last:pb-0">
                  <span
                    aria-hidden="true"
                    className="absolute top-2 -left-[34px] size-3 rounded-full bg-accent-deco"
                  />
                  <p className="text-[0.875rem] text-muted">
                    {formatYear(degree.start, locale)} – {formatYear(degree.end, locale)}
                    {degree.inProgress ? (
                      <>
                        {' '}
                        {/* Status is never colour alone — the text carries it. */}
                        <span className="ml-1.5 inline-flex items-center gap-1 rounded-full bg-accent-soft px-2 py-0.5 text-[0.75rem] font-semibold text-accent">
                          {t('journey.inProgress')}
                        </span>
                      </>
                    ) : null}
                  </p>
                  <h4 className="mt-1 text-[1.0625rem] font-semibold">{title}</h4>
                  {degree.location ? (
                    <p className="mt-1.5 flex items-center gap-1.5 text-[0.875rem] text-muted">
                      <Icon name="graduationCap" size={16} className="text-accent-deco" />
                      {t('journey.school')}
                    </p>
                  ) : null}
                </li>
              )
            })}
          </ol>
        </section>
      </div>
    </Section>
  )
}
