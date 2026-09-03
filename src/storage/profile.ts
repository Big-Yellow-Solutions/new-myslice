/**
 * Device-local persistence for the profile.
 *
 * There is no sign-in yet, so edits are stored in `localStorage` against a
 * single key. When accounts arrive, swap these two functions for the SIS
 * calls and key the record by user — nothing else in the app touches storage.
 */

import { student, type NameRecord, type Student } from '../data/student'

const STORAGE_KEY = 'myslice.profile.v1'

export type SaveResult = { ok: true } | { ok: false; error: string }

/** Stored JSON is untrusted — it can be stale, hand-edited, or from an older
 *  version of the record shape — so every field falls back to the default. */
function text(value: unknown, fallback: string): string {
  return typeof value === 'string' ? value : fallback
}

function names(value: unknown): NameRecord[] {
  if (!Array.isArray(value)) return student.names
  const parsed = value
    .filter((row): row is Record<string, unknown> => typeof row === 'object' && row !== null)
    .map((row, index) => ({
      id: text(row.id, `name-stored-${index}`),
      name: text(row.name, ''),
      type: text(row.type, ''),
    }))
  return parsed.length > 0 ? parsed : student.names
}

function merge(stored: Record<string, unknown>): Student {
  const citizenship = (stored.citizenship ?? {}) as Record<string, unknown>
  const biographic = (stored.biographic ?? {}) as Record<string, unknown>
  return {
    id: text(stored.id, student.id),
    photoUrl: typeof stored.photoUrl === 'string' ? stored.photoUrl : null,
    dateOfBirth: text(stored.dateOfBirth, student.dateOfBirth),
    names: names(stored.names),
    citizenship: {
      country: text(citizenship.country, student.citizenship.country),
      status: text(citizenship.status, student.citizenship.status),
    },
    biographic: {
      gender: text(biographic.gender, student.biographic.gender),
      maritalStatus: text(biographic.maritalStatus, student.biographic.maritalStatus),
      militaryStatus: text(biographic.militaryStatus, student.biographic.militaryStatus),
    },
  }
}

export function loadProfile(): Student {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return student
    const parsed: unknown = JSON.parse(raw)
    if (typeof parsed !== 'object' || parsed === null) return student
    return merge(parsed as Record<string, unknown>)
  } catch {
    // Private browsing, disabled storage, or corrupt JSON — show the defaults.
    return student
  }
}

export function saveProfile(profile: Student): SaveResult {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
    return { ok: true }
  } catch (error) {
    const quotaExceeded =
      error instanceof DOMException &&
      (error.name === 'QuotaExceededError' || error.name === 'NS_ERROR_DOM_QUOTA_REACHED')
    return {
      ok: false,
      error: quotaExceeded
        ? 'Not enough space on this device to save. Try a smaller photo.'
        : "Couldn't save to this device. Changes will be lost on reload.",
    }
  }
}

export function clearProfile() {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Nothing to do — storage is unavailable, so nothing was written either.
  }
}
