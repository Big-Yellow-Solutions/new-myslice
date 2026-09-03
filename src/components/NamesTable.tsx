import type { NameRecord } from '../data/student'
import { ChevronRightIcon } from './icons'

type NamesTableProps = {
  names: NameRecord[]
  onSelect?: (record: NameRecord) => void
}

export function NamesTable({ names, onSelect }: NamesTableProps) {
  return (
    <div className="names-table">
      <div className="names-table__head">Name/Type</div>
      {names.map((record) => (
        <button
          key={`${record.name}-${record.type}`}
          type="button"
          className="names-table__row"
          onClick={() => onSelect?.(record)}
        >
          <span className="names-table__cell">
            <span className="names-table__name">{record.name}</span>
            <span className="names-table__type">{record.type}</span>
          </span>
          <ChevronRightIcon />
        </button>
      ))}
    </div>
  )
}
