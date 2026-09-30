import { useTranslation } from 'react-i18next'
import { Icon, type IconName } from './Icon'
import { BadgeGroup, BadgeItem, Section } from './ui'
import { SKILL_DOMAINS } from '../data/profile'

/**
 * Skills are grouped badges only. The source document proposed a percentage
 * per skill, but docs/prompt_portfolio.md forbids invented figures and
 * design.md gives no bar component, so no progress bars are rendered
 * (the lavender token therefore marks the AI domain instead).
 */
export function Skills() {
  const { t } = useTranslation()

  return (
    <Section id="skills" title={t('skills.title')} lead={t('skills.lead')} icon="codeXml">
      <div className="grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2">
        {SKILL_DOMAINS.map((domain) => {
          const items =
            domain.id === 'other'
              ? (t('skills.other', { returnObjects: true }) as string[])
              : domain.items

          return (
            <section key={domain.id} aria-labelledby={`skill-${domain.id}`}>
              <h3
                id={`skill-${domain.id}`}
                className="flex items-center gap-2.5 text-[1.0625rem] font-semibold"
              >
                {/* §6 — accent-deco is decorative, never used for text. */}
                <Icon name={domain.icon as IconName} size={24} className="text-accent-deco" />
                {t(`skills.domains.${domain.id}`)}
              </h3>
              <div className="mt-3.5">
                <BadgeGroup>
                  {items.map((item) => (
                    <BadgeItem key={item} tone={domain.tone}>
                      {item}
                    </BadgeItem>
                  ))}
                </BadgeGroup>
              </div>
            </section>
          )
        })}
      </div>
    </Section>
  )
}
