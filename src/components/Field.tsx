import { useId } from 'react'

type FieldProps = {
  label: string
  value: string
  className?: string
  /** When true the value renders as a text input instead of static text. */
  editing?: boolean
  onChange?: (value: string) => void
  placeholder?: string
}

/** Label/value pair — the record row used throughout the profile screens. */
export function Field({ label, value, className, editing, onChange, placeholder }: FieldProps) {
  const inputId = useId()

  if (editing) {
    return (
      <div className={className}>
        <label className="field__label" htmlFor={inputId}>
          {label}
        </label>
        <input
          id={inputId}
          className="text-input"
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange?.(event.target.value)}
        />
      </div>
    )
  }

  return (
    <div className={className}>
      <div className="field__label">{label}</div>
      <div className="field__value">{value || '—'}</div>
    </div>
  )
}
