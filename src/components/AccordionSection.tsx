import type { ReactNode } from 'react'
import { ChevronDownIcon } from './icons'

type AccordionSectionProps = {
  id: string
  label: string
  open: boolean
  onToggle: () => void
  children: ReactNode
}

/**
 * Collapsible detail section. The body mounts and unmounts rather than
 * animating — the design specifies no transition.
 */
export function AccordionSection({
  id,
  label,
  open,
  onToggle,
  children,
}: AccordionSectionProps) {
  return (
    <section className="accordion">
      <button
        type="button"
        className="accordion__header"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`${id}-body`}
      >
        <ChevronDownIcon
          className={`accordion__chevron${open ? '' : ' accordion__chevron--collapsed'}`}
        />
        <span className="accordion__label">{label}</span>
      </button>
      {open ? (
        <div className="accordion__body" id={`${id}-body`}>
          {children}
        </div>
      ) : null}
    </section>
  )
}
