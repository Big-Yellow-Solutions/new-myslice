import { ArrowLeftIcon, BellIcon, OverflowIcon } from './icons'

type AppBarProps = {
  title: string
  onBack?: () => void
  onNotifications?: () => void
  onOverflow?: () => void
}

export function AppBar({ title, onBack, onNotifications, onOverflow }: AppBarProps) {
  return (
    <header className="appbar">
      <button type="button" className="icon-button" onClick={onBack} aria-label="Back">
        <ArrowLeftIcon />
      </button>
      <div className="appbar__divider" />
      <span className="appbar__title">{title}</span>
      <div className="appbar__actions">
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
      </div>
    </header>
  )
}
