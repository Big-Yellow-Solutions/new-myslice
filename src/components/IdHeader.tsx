import { PersonSilhouetteIcon } from './icons'

type IdHeaderProps = {
  studentId: string
  photoUrl?: string | null
}

export function IdHeader({ studentId, photoUrl }: IdHeaderProps) {
  return (
    <div className="id-strip">
      <div className="id-strip__frame">
        {photoUrl ? (
          <img className="id-strip__photo" src={photoUrl} alt="" />
        ) : (
          <div className="id-strip__placeholder">
            <PersonSilhouetteIcon />
          </div>
        )}
      </div>
      <div className="id-strip__text">
        <span className="id-strip__label">ID</span>
        <span className="id-strip__value">{studentId}</span>
      </div>
    </div>
  )
}
