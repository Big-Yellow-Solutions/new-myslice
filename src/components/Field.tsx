type FieldProps = {
  label: string
  value: string
  className?: string
}

/** Label/value pair — the record row used throughout the profile screens. */
export function Field({ label, value, className }: FieldProps) {
  return (
    <div className={className}>
      <div className="field__label">{label}</div>
      <div className="field__value">{value}</div>
    </div>
  )
}
