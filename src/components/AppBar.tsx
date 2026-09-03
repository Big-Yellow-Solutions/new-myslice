import type { ReactNode } from 'react'
import { ArrowLeftIcon, BellIcon, OverflowIcon } from './icons'

type AppBarProps = {
  title: string
  onBack?: () => void
  onNotifications?: () => void
  onOverflow?: () => void
  /** Rendered at the left of the action group — Edit, or Cancel/Save. */
  actions?: ReactNode
  /** Hide the bell and overflow to make room while editing. */
  showDefaultActions?: boolean
}

export function AppBar({
  title,
  onBack,
  onNotifications,
  onOverflow,
  actions,
  showDefaultActions = true,
}: AppBarProps) {
  return (
    <header className="appbar">
      <button type="button" className="icon-button" onClick={onBack} aria-label="Back">
        <ArrowLeftIcon />
      </button>
      <div className="appbar__divider" />
      <span className="appbar__title">{title}</span>
      <div className="appbar__actions">
        {actions}
        {showDefaultActions ? (
          <>
            <button
              type="button"
              className="icon-button"
              onClick={onNotifications}
              aria-label="Notifications"
            >
              <BellIcon />
            </button>
            <button
              type="button"
              className="icon-button icon-button--overflow"
              onClick={onOverflow}
              aria-label="More options"
            >
              <OverflowIcon />
            </button>
          </>
        ) : null}
      </div>
    </header>
  )
}
