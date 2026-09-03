/**
 * Fabricated student record standing in for the SIS API response.
 *
 * Real shape needed from the API: photo URL, student ID, date of birth and a
 * list of name records. `citizenship` and `biographic` are invented
 * placeholders — the source screen did not show them, so confirm the real
 * field definitions before shipping.
 *
 * This record is the *default*. Anything the user edits is stored on the
 * device (see `src/storage/profile.ts`) and layered over these values on load.
 */

export type NameRecord = {
  /** Stable key for list editing — two records can share a name and type. */
  id: string
  name: string
  type: string
}

export type Student = {
  id: string
  /** Data URL for an uploaded photo, or null to fall back to the silhouette. */
  photoUrl: string | null
  dateOfBirth: string
  names: NameRecord[]
  citizenship: {
    country: string
    status: string
  }
  biographic: {
    gender: string
    maritalStatus: string
    militaryStatus: string
  }
}

export const student: Student = {
  id: '709057091',
  photoUrl: null,
  dateOfBirth: '11/18/2002',
  names: [
    { id: 'name-primary', name: 'Joshua Rader', type: 'Primary' },
    { id: 'name-preferred', name: 'Joshua Rader', type: 'Preferred' },
  ],
  citizenship: {
    country: 'United States',
    status: 'Native',
  },
  biographic: {
    gender: 'Male',
    maritalStatus: 'Single',
    militaryStatus: 'Not Applicable',
  },
}

let nameCounter = 0

/** Id for a name record added during editing. */
export function newNameId() {
  nameCounter += 1
  return `name-${Date.now().toString(36)}-${nameCounter}`
}
