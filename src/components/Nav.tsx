import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { Icon } from './Icon'
import { useTheme } from '../hooks/useTheme'
import { setLanguage, type Language } from '../i18n'

const SECTIONS = [
  { id: 'about', labelKey: 'nav.about' },
  { id: 'projects', labelKey: 'nav.projects' },
  { id: 'skills', labelKey: 'nav.skills' },
  { id: 'journey', labelKey: 'nav.journey' },
  { id: 'contact', labelKey: 'nav.contact' },
] as const

export function Nav() {
  const { t, i18n } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()
  const { theme, toggle } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState<string>('')

  const currentLanguage = (i18n.language?.startsWith('en') ? 'en' : 'fr') as Language
  const otherLanguage: Language = currentLanguage === 'fr' ? 'en' : 'fr'

  // Lock body scroll while the fullscreen panel is open. This synchronises
  // with an external system (the document), so an effect is the right tool.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  // Escape closes the mobile panel — expected on touch devices with keyboards
  // and on desktop-sized windows that still show the panel (below md).
  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  // Scroll-spy: mark the section whose top is closest above the fold.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 },
    )
    for (const { id } of SECTIONS) {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    }
    return () => observer.disconnect()
  }, [location.pathname])

  const switchLanguage = () => {
    setLanguage(otherLanguage)
    setMenuOpen(false)
    // Move to the equivalent page in the other language, keeping any hash.
    navigate(`${otherLanguage === 'en' ? '/en' : '/'}${location.hash}`, { replace: true })
  }

  return (
    <>
      <header
        className="sticky top-0 z-50 border-b border-border"
        style={{ backgroundColor: 'var(--nav-bg)', backdropFilter: 'blur(6px)' }}
      >
      <div className="shell flex h-16 items-center justify-between gap-2 md:gap-4">
        <a
          href={location.pathname === '/en' ? '/en#top' : '/#top'}
          className="inline-flex min-h-11 items-center font-display text-[0.9375rem] font-semibold tracking-tight whitespace-nowrap text-ink max-[380px]:text-[0.8125rem] md:text-[1.0625rem]"
        >
          Zaraniaina Emilson
        </a>

        <nav aria-label={t('nav.mainNav')} className="hidden items-center gap-1 md:flex">
          {SECTIONS.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              aria-current={active === section.id ? 'true' : undefined}
              className={[
                'inline-flex min-h-11 items-center border-b-2 px-3 text-[0.9375rem] transition-colors duration-150',
                active === section.id
                  ? 'border-accent font-semibold text-accent'
                  : 'border-transparent text-muted hover:text-ink',
              ].join(' ')}
            >
              {t(section.labelKey)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={toggle}
            aria-label={t('nav.toggleTheme')}
            title={t('nav.theme')}
            className="inline-flex size-11 items-center justify-center rounded-[10px] text-muted transition-colors duration-150 hover:bg-accent-soft hover:text-ink"
          >
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={20} />
          </button>

          {/* Language switch — visible on mobile too (docs/prompt_portfolio.md). */}
          <button
            type="button"
            onClick={switchLanguage}
            aria-label={
              otherLanguage === 'en' ? t('nav.switchToEnglish') : t('nav.switchToFrench')
            }
            className="inline-flex min-h-11 items-center gap-1.5 rounded-[10px] px-2 text-[0.875rem] font-semibold whitespace-nowrap text-muted transition-colors duration-150 hover:bg-accent-soft hover:text-ink"
          >
            <Icon name="languages" size={18} />
            {/* Icon alone below 380px: the full label cannot fit next to the
                brand name without pushing the header into horizontal scroll. */}
            <span aria-hidden="true" className="whitespace-nowrap max-[380px]:hidden">
              {currentLanguage === 'fr' ? 'FR | EN' : 'EN | FR'}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
            aria-expanded={menuOpen}
            className="inline-flex size-11 items-center justify-center rounded-[10px] text-ink transition-colors duration-150 hover:bg-accent-soft md:hidden"
          >
            <Icon name={menuOpen ? 'x' : 'menu'} size={22} />
          </button>
        </div>
        </div>
      </header>

      {/*
        The panel is a sibling of <header>, not a child: the header sets
        `backdrop-filter`, which makes it the containing block for
        `position: fixed` descendants and would otherwise trap this panel
        inside the 64px header instead of covering the viewport.
      */}
      {menuOpen ? (
        <div className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-bg md:hidden">
          <nav aria-label={t('nav.openMenu')} className="shell flex flex-col py-4">
            {SECTIONS.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={() => setMenuOpen(false)}
                className={[
                  'flex min-h-14 items-center border-b border-border text-[1.125rem]',
                  active === section.id ? 'font-semibold text-accent' : 'text-ink',
                ].join(' ')}
              >
                {t(section.labelKey)}
              </a>
            ))}
          </nav>
        </div>
      ) : null}
    </>
  )
}
