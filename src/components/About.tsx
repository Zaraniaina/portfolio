import { useTranslation } from 'react-i18next'
import { Icon } from './Icon'
import { Section } from './ui'

/**
 * Stats come from verified figures in the source documents. The "projects
 * delivered" count is absent from the source, so it is not shown at all rather
 * than guessed (docs/prompt_portfolio.md).
 */
export function About() {
  const { t } = useTranslation()

  const stats = [
    { value: t('about.stats.experienceValue'), label: t('about.stats.experience') },
    { value: t('about.stats.yearsValue'), label: t('about.stats.years') },
    { value: t('about.stats.techValue'), label: t('about.stats.tech') },
  ]

  const paragraphs = t('about.body', { returnObjects: true }) as string[]
  const qualities = t('about.qualities', { returnObjects: true }) as string[]
  const languages = t('about.languages', { returnObjects: true }) as {
    name: string
    level: string
  }[]
  // `interests` is a single translated sentence, so split it into items.
  const interests = t('about.interests')
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean)

  return (
    <Section id="about" title={t('about.title')} lead={t('about.lead')} alt icon="user">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-7">
          {paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="measure mb-4 last:mb-0">
              {paragraph}
            </p>
          ))}

          <h3 className="mt-10 text-[1.25rem]">{t('about.qualitiesTitle')}</h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {qualities.map((quality) => (
              <li
                key={quality}
                className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1 text-[0.875rem] text-accent"
              >
                <Icon name="sparkles" size={16} />
                {quality}
              </li>
            ))}
          </ul>
        </div>

        <aside className="md:col-span-5">
          {/* §7 — hierarchy from borders and background, not heavy shadows. */}
          <div className="rounded-[14px] border border-border bg-surface p-6">
            <h3 className="text-[0.9375rem] font-semibold text-muted">
              {t('about.statsTitle')}
            </h3>
            <dl className="mt-4 space-y-4">
              {stats.map((stat) => (
                <div key={stat.label} className="flex items-baseline gap-3">
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="font-display text-[1.75rem] font-semibold text-accent">
                    {stat.value}
                  </dd>
                  <span aria-hidden="true" className="text-[0.9375rem] text-ink">
                    {stat.label}
                  </span>
                </div>
              ))}
            </dl>

            <h3 className="mt-8 border-t border-border pt-6 text-[0.9375rem] font-semibold text-muted">
              {t('about.languagesTitle')}
            </h3>
            <ul className="mt-3 space-y-2">
              {languages.map((language) => (
                <li key={language.name} className="flex items-baseline justify-between gap-4">
                  <span className="text-ink">{language.name}</span>
                  <span className="text-right text-[0.875rem] text-muted">{language.level}</span>
                </li>
              ))}
            </ul>

            <h3 className="mt-8 border-t border-border pt-6 text-[0.9375rem] font-semibold text-muted">
              {t('about.interestsTitle')}
            </h3>
            {/* §6 — Lucide icons instead of the emoji used in the source notes.
                The label arrives translated, so match on language-neutral
                keywords rather than on the rendered string. */}
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
              {interests.map((interest) => (
                <li key={interest} className="inline-flex items-center gap-2 text-ink">
                  <Icon
                    name={
                      /football|foot/.test(interest.toLowerCase()) ? 'trophy' : 'fish'
                    }
                    size={18}
                    className="text-accent-deco"
                  />
                  {interest}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </Section>
  )
}
