import type { NameRecord } from '../data/student'
import { ChevronRightIcon } from './icons'

type NamesTableProps = {
  names: NameRecord[]
  onSelect?: (record: NameRecord) => void
  editing?: boolean
  onChange?: (id: string, patch: Partial<Omit<NameRecord, 'id'>>) => void
  onRemove?: (id: string) => void
  onAdd?: () => void
}

export function NamesTable({
  names,
  onSelect,
  editing,
  onChange,
  onRemove,
  onAdd,
}: NamesTableProps) {
  if (editing) {
    return (
      <>
        <div className="names-table">
          <div className="names-table__head">Name/Type</div>
          {names.map((record) => (
            <div key={record.id} className="names-table__row names-table__row--editing">
              <div className="names-table__cell names-table__cell--editing">
                <label className="visually-hidden" htmlFor={`${record.id}-name`}>
                  Name
                </label>
                <input
                  id={`${record.id}-name`}
                  className="text-input"
                  type="text"
                  value={record.name}
                  placeholder="Name"
                  onChange={(event) => onChange?.(record.id, { name: event.target.value })}
                />
                <label className="visually-hidden" htmlFor={`${record.id}-type`}>
                  Type
                </label>
                <input
                  id={`${record.id}-type`}
                  className="text-input"
                  type="text"
                  value={record.type}
                  placeholder="Type"
                  onChange={(event) => onChange?.(record.id, { type: event.target.value })}
                />
              </div>
              <button
                type="button"
                className="link-button link-button--danger"
                onClick={() => onRemove?.(record.id)}
                aria-label={`Remove ${record.name || 'name'}`}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <button type="button" className="link-button link-button--block" onClick={onAdd}>
          + Add name
        </button>
      </>
    )
  }

  return (
    <div className="names-table">
      <div className="names-table__head">Name/Type</div>
      {names.map((record) => (
        <button
          key={record.id}
          type="button"
          className="names-table__row"
          onClick={() => onSelect?.(record)}
        >
          <span className="names-table__cell">
            <span className="names-table__name">{record.name || '—'}</span>
            <span className="names-table__type">{record.type}</span>
          </span>
          <ChevronRightIcon />
        </button>
      ))}
    </div>
  )
}
