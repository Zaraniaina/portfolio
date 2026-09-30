import {
  Bot,
  Briefcase,
  ChevronUp,
  CircleAlert,
  CircleCheck,
  CodeXml,
  Database,
  Download,
  ExternalLink,
  Fish,
  GitBranch,
  GraduationCap,
  Info,
  Languages,
  LayoutTemplate,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  MonitorPlay,
  Moon,
  Phone,
  Plug,
  Send,
  Sparkles,
  Sun,
  Terminal,
  Trophy,
  User,
  Wrench,
  X,
  type LucideIcon,
} from 'lucide-react'

/**
 * Every icon in the site comes from Lucide at stroke width 1.75 (design.md §6).
 *
 * Note: Lucide v1 removed brand marks, so there is no `github` or `linkedin`
 * icon. Since design.md also forbids mixing icon libraries, repository links
 * reuse `code-xml`, which is the mapping the brief already gives for source
 * code.
 */
export const STROKE_WIDTH = 1.75

const REGISTRY = {
  bot: Bot,
  briefcase: Briefcase,
  chevronUp: ChevronUp,
  circleAlert: CircleAlert,
  circleCheck: CircleCheck,
  codeXml: CodeXml,
  database: Database,
  download: Download,
  externalLink: ExternalLink,
  fish: Fish,
  gitBranch: GitBranch,
  graduationCap: GraduationCap,
  info: Info,
  languages: Languages,
  layoutTemplate: LayoutTemplate,
  mail: Mail,
  mapPin: MapPin,
  menu: Menu,
  messageCircle: MessageCircle,
  monitorPlay: MonitorPlay,
  moon: Moon,
  phone: Phone,
  plug: Plug,
  send: Send,
  sparkles: Sparkles,
  sun: Sun,
  terminal: Terminal,
  trophy: Trophy,
  user: User,
  wrench: Wrench,
  x: X,
} satisfies Record<string, LucideIcon>

export type IconName = keyof typeof REGISTRY

type IconProps = {
  name: IconName
  size?: number
  className?: string
  /**
   * Decorative icons are hidden from assistive tech. Set `label` only when the
   * icon is the sole carrier of meaning (design.md §6).
   */
  label?: string
}

export function Icon({ name, size = 18, className, label }: IconProps) {
  const Cmp = REGISTRY[name]
  return (
    <Cmp
      size={size}
      strokeWidth={STROKE_WIDTH}
      className={className}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? 'img' : undefined}
    />
  )
}
