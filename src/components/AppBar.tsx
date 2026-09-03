import type { ReactNode } from 'react'
import { ArrowLeftIcon, BellIcon, OverflowIcon } from './icons'
import { OverflowMenu, type MenuItem } from './OverflowMenu'

type AppBarProps = {
  title: string
  onBack?: () => void
  onNotifications?: () => void
  onOverflow?: () => void
  /** Items for the three-dot menu. Falls back to `onOverflow` when empty. */
  menuItems?: MenuItem[]
  /** Rendered at the left of the action group — Cancel/Save while editing. */
  actions?: ReactNode
  /** Hide the bell and overflow to make room while editing. */
  showDefaultActions?: boolean
}

export function AppBar({
  title,
  onBack,
  onNotifications,
  onOverflow,
  menuItems,
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
            {menuItems && menuItems.length > 0 ? (
              <OverflowMenu items={menuItems} />
            ) : (
              <button
                type="button"
                className="icon-button icon-button--overflow"
                onClick={onOverflow}
                aria-label="More options"
              >
                <OverflowIcon />
              </button>
            )}
          </>
        ) : null}
      </div>
    </header>
  )
}
