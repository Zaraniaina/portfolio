import { useTranslation } from 'react-i18next'
import { Icon } from './Icon'
import { Reveal } from './Reveal'
import { BadgeGroup, BadgeItem, ButtonLink, Section } from './ui'
import { PROJECTS, type Project } from '../data/projects'

/**
 * A project card renders only what actually exists. When a demo URL or
 * screenshots are unavailable, that element is omitted entirely — no
 * placeholder, no example link, no empty frame (docs/prompt_portfolio.md).
 */
function ProjectCard({ project }: { project: Project }) {
  const { t } = useTranslation()
  const content = t(`projects.items.${project.id}`, { returnObjects: true }) as {
    title: string
    tag?: string
    summary: string
    problem: string
    contribution: string[]
    result?: string
    stackLabel?: string
  }

  const bullets = Array.isArray(content.contribution) ? content.contribution : []

  return (
    <article
      className={[
        'rounded-[14px] border border-border bg-surface shadow-soft',
        // §7 — no hover zoom, just a border shift to accent-deco.
        'transition-colors duration-150 hover:border-accent-deco',
        project.featured ? 'p-6 md:p-8' : 'p-6',
      ].join(' ')}
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
        <h3 className={project.featured ? 'text-[1.5rem]' : 'text-[1.25rem]'}>{content.title}</h3>
        {content.tag ? (
          <span className="rounded-full bg-lavender-soft px-3 py-1 font-mono text-[0.8125rem] text-lavender-ink">
            {content.tag}
          </span>
        ) : null}
      </div>

      <p className="measure mt-3 text-muted">{content.summary}</p>

      {project.featured ? (
        <>
          <h4 className="mt-7 text-[0.9375rem] font-semibold text-ink">
            <Icon name="info" size={18} className="mr-2 inline-block align-[-3px] text-accent-deco" />
            {t('projects.problemLabel')}
          </h4>
          <p className="measure mt-2 text-muted">{content.problem}</p>
        </>
      ) : null}

      {bullets.length > 0 ? (
        <div className="mt-6">
          <h4 className="text-[0.9375rem] font-semibold text-ink">
            {t('projects.contributionLabel')}
          </h4>
          <ul className="measure mt-2 space-y-1.5">
            {bullets.map((bullet) => (
              <li key={bullet} className="flex gap-2.5 text-muted">
                <Icon name="circleCheck" size={18} className="mt-1 shrink-0 text-accent-deco" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {content.result ? (
        <div className="mt-6 rounded-[10px] border border-border bg-surface-alt p-4">
          <h4 className="flex items-center gap-2 text-[0.9375rem] font-semibold text-ink">
            <Icon name="sparkles" size={18} className="text-accent-deco" />
            {t('projects.resultLabel')}
          </h4>
          <p className="measure mt-2 text-muted">{content.result}</p>
        </div>
      ) : null}

      {project.stack.length > 0 ? (
        <div className="mt-6 space-y-3">
          {project.stack.map((group) => (
            <div key={group.labelKey}>
              <h4 className="font-mono text-[0.8125rem] text-muted">{t(group.labelKey)}</h4>
              <div className="mt-2">
                <BadgeGroup>
                  {group.items.map((item) => (
                    // Scoped to the group so duplicate names across groups
                    // (e.g. React in Frontend and API REST in Backend) stay unique.
                    <BadgeItem key={`${group.labelKey}-${item}`}>{item}</BadgeItem>
                  ))}
                </BadgeGroup>
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {/* Links render only when the URL is real. */}
      {project.repoUrl || project.demoUrl ? (
        <div className="mt-7 flex flex-wrap gap-3 border-t border-border pt-5">
          {project.repoUrl ? (
            <ButtonLink
              href={project.repoUrl}
              variant="secondary"
              icon="codeXml"
              external
            >
              {t('projects.repository')}
            </ButtonLink>
          ) : null}
          {project.demoUrl ? (
            <ButtonLink href={project.demoUrl} variant="discreet" icon="monitorPlay" external>
              {t('projects.demo')}
            </ButtonLink>
          ) : null}
        </div>
      ) : null}
    </article>
  )
}

export function Projects() {
  const { t } = useTranslation()
  const featured = PROJECTS.filter((project) => project.featured)
  const rest = PROJECTS.filter((project) => !project.featured)

  return (
    <Section id="projects" title={t('projects.title')} lead={t('projects.lead')} alt icon="layoutTemplate">
      {featured.map((project) => (
        <Reveal key={project.id} className="mb-12">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 text-[0.8125rem] font-semibold text-accent">
            <Icon name="sparkles" size={16} />
            {t('projects.flagship')}
          </p>
          <ProjectCard project={project} />
        </Reveal>
      ))}

      {/* §5 — two columns on desktop, one on mobile. Each card arrives with a
          small stagger so the grid reads as a sequence. */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {rest.map((project, index) => (
          <Reveal key={project.id} delay={index * 90}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
