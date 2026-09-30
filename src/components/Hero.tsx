import { useTranslation } from 'react-i18next'
import { Icon } from './Icon'
import { ButtonLink } from './ui'
import { CONTACT } from '../data/profile'
// Square WebP crop derived from the original 499×876 portrait photo
// (docs/design.md §9 asks for a square crop; the source is portrait).
import profilePhoto from '../assets/moi.webp'

// `base: './'` in vite.config.ts makes the URL work from any sub-path
// (GitHub Pages project sites). Served as-is from public/.
const CV_URL = `${import.meta.env.BASE_URL}CV_Zaraniaina.pdf`

/**
 * The hero is the site's single "élément marquant" (design.md §1.4): the name
 * and the photo. Everything after this section stays deliberately quiet.
 */
export function Hero() {
  const { t } = useTranslation()

  return (
    <section id="top" className="py-14 md:py-24">
      <div className="shell grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-12">
        {/* design.md §5 — on mobile the photo moves above the text. */}
        <div className="enter order-last md:order-first md:col-span-7">
          {/* The one and only H1 on the page (design.md §10). */}
          <h1 className="text-[clamp(2.4rem,5vw,3.6rem)] leading-[1.1] font-semibold tracking-[-0.02em]">
            {t('hero.name')}
          </h1>

          <p className="mt-4 text-[1.125rem] font-semibold text-accent">{t('hero.title')}</p>

          <p className="measure mt-5 text-muted">{t('hero.tagline')}</p>

          <p className="mt-5 flex items-start gap-2 text-[0.9375rem] text-muted">
            <Icon name="mapPin" size={18} className="mt-1 shrink-0 text-accent-deco" />
            <span>{t('hero.status')}</span>
          </p>

          {/* One line of concrete proof, visible immediately (spec §Accueil). */}
          <p className="mt-3 flex items-start gap-2 text-[0.9375rem] text-muted">
            <Icon name="briefcase" size={18} className="mt-1 shrink-0 text-accent-deco" />
            <span>{t('hero.proof')}</span>
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="#contact" icon="mail">
              {t('hero.ctaContact')}
            </ButtonLink>
            {/* FR PDF today; the EN button appears only once its PDF exists. */}
            <ButtonLink href={CV_URL} variant="secondary" icon="download" download>
              {t('hero.ctaCv')}
            </ButtonLink>
            <ButtonLink href="#projects" variant="discreet" icon="layoutTemplate">
              {t('hero.ctaProjects')}
            </ButtonLink>
          </div>
        </div>

        <div className="enter-delay order-first md:order-last md:col-span-5">
          {/* design.md §9: square crop, 20px radius (not a circle), neutral
              background. object-cover keeps the portrait source centred on the
              face inside a square frame. */}
          <div
            className="mx-auto w-full max-w-[380px] overflow-hidden rounded-[20px] border border-border bg-surface-alt"
            style={{ aspectRatio: '1 / 1' }}
          >
            <img
              src={profilePhoto}
              alt={t('hero.name')}
              width={499}
              height={499}
              fetchPriority="high"
              decoding="async"
              className="size-full object-cover"
            />
          </div>

          <p className="mt-3 text-center text-[0.875rem] text-muted">
            <Icon name="mapPin" size={16} className="mr-1.5 inline-block align-[-2px] text-accent-deco" />
            {CONTACT.location}
          </p>
        </div>
      </div>
    </section>
  )
}
