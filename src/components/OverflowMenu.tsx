import { useEffect, useRef, useState } from 'react'
import { OverflowIcon } from './icons'

export type MenuItem = {
  label: string
  onSelect: () => void
  /** Destructive items are set in the danger color and listed last. */
  danger?: boolean
}

type OverflowMenuProps = {
  items: MenuItem[]
}

/** The app bar's three-dot button and the menu it opens. */
export function OverflowMenu({ items }: OverflowMenuProps) {
  const [open, setOpen] = useState(false)
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    function onPointerDown(event: PointerEvent) {
      if (!container.current?.contains(event.target as Node)) setOpen(false)
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <div className="overflow-menu" ref={container}>
      <button
        type="button"
        className="icon-button icon-button--overflow"
        onClick={() => setOpen((current) => !current)}
        aria-label="More options"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <OverflowIcon />
      </button>
      {open ? (
        <div className="overflow-menu__list" role="menu">
          {items.map((item) => (
            <button
              key={item.label}
              type="button"
              role="menuitem"
              className={`overflow-menu__item${item.danger ? ' overflow-menu__item--danger' : ''}`}
              onClick={() => {
                setOpen(false)
                item.onSelect()
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
