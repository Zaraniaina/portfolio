import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Icon } from './Icon'

type ToastProps = {
  tone: 'success' | 'error'
  message: string
  onClose: () => void
  closeLabel: string
  /** Auto-dismiss delay in ms. */
  duration?: number
}

/**
 * Transient confirmation pill, rendered in a portal so it floats above every
 * section. It replaces the inline status note after the contact form is sent:
 * the submit button stays where it is, the feedback is impossible to miss and
 * it dismisses itself. Dismissal: close button, Escape, or after `duration`.
 * The one-shot fade uses the `toast-in` keyframes in index.css; the global
 * `prefers-reduced-motion` kill switch turns the movement off.
 */
export function Toast({ tone, message, onClose, closeLabel, duration = 6000 }: ToastProps) {
  useEffect(() => {
    const timer = window.setTimeout(onClose, duration)
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [duration, onClose])

  return createPortal(
    <div className="fixed inset-x-4 bottom-4 z-[60] sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-auto sm:max-w-md">
      <div
        role="status"
        aria-live="polite"
        className={`flex items-start gap-2.5 rounded-[12px] border bg-surface px-4 py-3 text-[0.9375rem] text-ink shadow-md animate-[toast-in_250ms_ease-out] ${
          tone === 'success' ? 'border-success/40' : 'border-error/40'
        }`}
      >
        <Icon
          name={tone === 'success' ? 'circleCheck' : 'circleAlert'}
          size={18}
          className={`mt-0.5 shrink-0 ${tone === 'success' ? 'text-success' : 'text-error'}`}
        />
        <span className="min-w-0 flex-1">{message}</span>
        <button
          type="button"
          onClick={onClose}
          aria-label={closeLabel}
          className="-mr-1 inline-flex size-7 shrink-0 items-center justify-center rounded-[8px] text-muted transition-colors duration-150 hover:bg-accent-soft hover:text-ink"
        >
          <Icon name="x" size={16} />
        </button>
      </div>
    </div>,
    document.body,
  )
}
