import { useTranslation } from 'react-i18next'
import { Icon } from './Icon'

export function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border py-10">
      <div className="shell flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="text-[0.875rem] text-muted">
          © {year} Zaraniaina Emilson. {t('footer.builtWith')}
        </p>
        <a
          href="#top"
          className="inline-flex min-h-11 items-center gap-2 rounded-[10px] px-2 text-[0.875rem] text-muted transition-colors duration-150 hover:bg-accent-soft hover:text-ink"
        >
          <Icon name="chevronUp" size={18} />
          {t('footer.backToTop')}
        </a>
      </div>
    </footer>
  )
}
