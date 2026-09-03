/**
 * Inline stand-ins for the platform icon set. Production Syracuse code uses the
 * Font Awesome Pro kit (@awesome.me/kit-dfae37e203, Sharp Regular); Lucide is
 * the approved free stand-in. Swap these for the kit's icons at the same sizes
 * and do not mix the two sets.
 */

type IconProps = {
  size?: number
  className?: string
}

export function ArrowLeftIcon({ size = 30, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <line x1="20" y1="12" x2="4" y2="12" />
      <polyline points="10 18 4 12 10 6" />
    </svg>
  )
}

export function BellIcon({ size = 26, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  )
}

export function OverflowIcon({ className }: IconProps) {
  return (
    <svg
      width="6"
      height="24"
      viewBox="0 0 6 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <circle cx="3" cy="3.5" r="2.6" />
      <circle cx="3" cy="12" r="2.6" />
      <circle cx="3" cy="20.5" r="2.6" />
    </svg>
  )
}

/** Chevron pointing down; rotate -90deg for the collapsed state. */
export function ChevronDownIcon({ size = 18, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--icon-chevron)"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

export function ChevronRightIcon({ size = 20, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--icon-chevron-row)"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <polyline points="9 6 15 12 9 18" />
    </svg>
  )
}

/** Silhouette placeholder shown until the real student photo is available. */
export function PersonSilhouetteIcon() {
  return (
    <svg width="26" height="34" viewBox="0 0 26 34" fill="#5f6266" aria-hidden="true">
      <circle cx="13" cy="11" r="7" />
      <path d="M0 34c0-7.2 5.8-13 13-13s13 5.8 13 13z" />
    </svg>
  )
}
