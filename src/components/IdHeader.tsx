import { useRef, useState } from 'react'
import { fileToPhotoDataUrl } from '../lib/photo'
import { PersonSilhouetteIcon } from './icons'

type IdHeaderProps = {
  studentId: string
  photoUrl?: string | null
  editing?: boolean
  onStudentIdChange?: (value: string) => void
  onPhotoChange?: (dataUrl: string | null) => void
}

export function IdHeader({
  studentId,
  photoUrl,
  editing,
  onStudentIdChange,
  onPhotoChange,
}: IdHeaderProps) {
  const fileInput = useRef<HTMLInputElement>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleFile(file: File | undefined) {
    if (!file) return
    setBusy(true)
    setError(null)
    try {
      onPhotoChange?.(await fileToPhotoDataUrl(file))
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Couldn't read that image.")
    } finally {
      setBusy(false)
      // Clear the input so picking the same file again still fires a change.
      if (fileInput.current) fileInput.current.value = ''
    }
  }

  const frame = (
    <div className="id-strip__frame">
      {photoUrl ? (
        <img className="id-strip__photo" src={photoUrl} alt="" />
      ) : (
        <div className="id-strip__placeholder">
          <PersonSilhouetteIcon />
        </div>
      )}
    </div>
  )

  return (
    <div className="id-strip">
      {editing ? (
        <button
          type="button"
          className="id-strip__photo-button"
          onClick={() => fileInput.current?.click()}
          aria-label={photoUrl ? 'Change profile photo' : 'Upload a profile photo'}
        >
          {frame}
          <span className="id-strip__photo-overlay">{busy ? '…' : 'Edit'}</span>
        </button>
      ) : (
        frame
      )}

      <div className="id-strip__text">
        <span className="id-strip__label" id="student-id-label">
          ID
        </span>
        {editing ? (
          <>
            <input
              className="text-input text-input--id"
              type="text"
              inputMode="numeric"
              value={studentId}
              aria-labelledby="student-id-label"
              onChange={(event) => onStudentIdChange?.(event.target.value)}
            />
            <div className="id-strip__photo-actions">
              <button
                type="button"
                className="link-button"
                onClick={() => fileInput.current?.click()}
                disabled={busy}
              >
                {photoUrl ? 'Change photo' : 'Upload photo'}
              </button>
              {photoUrl ? (
                <button
                  type="button"
                  className="link-button"
                  onClick={() => onPhotoChange?.(null)}
                  disabled={busy}
                >
                  Remove
                </button>
              ) : null}
            </div>
            {error ? <p className="id-strip__error">{error}</p> : null}
          </>
        ) : (
          <span className="id-strip__value">{studentId}</span>
        )}
      </div>

      <input
        ref={fileInput}
        type="file"
        accept="image/*"
        className="visually-hidden"
        onChange={(event) => void handleFile(event.target.files?.[0])}
      />
    </div>
  )
}
