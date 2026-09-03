import { useCallback, useState } from 'react'
import type { Student } from '../data/student'
import { student } from '../data/student'
import { clearProfile, loadProfile, saveProfile, type SaveResult } from '../storage/profile'

/**
 * The profile record plus its persistence. Reads stored edits once on mount;
 * every save writes through to the device so the record survives a reload.
 */
export function useProfile() {
  const [profile, setProfile] = useState<Student>(loadProfile)

  const save = useCallback((next: Student): SaveResult => {
    setProfile(next)
    return saveProfile(next)
  }, [])

  const reset = useCallback(() => {
    clearProfile()
    setProfile(student)
  }, [])

  return { profile, save, reset }
}
