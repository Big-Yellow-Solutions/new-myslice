/**
 * Fabricated student record standing in for the SIS API response.
 *
 * Real shape needed from the API: photo URL, student ID, date of birth and a
 * list of name records. `citizenship` and `biographic` are invented
 * placeholders — the source screen did not show them, so confirm the real
 * field definitions before shipping.
 */

export type NameRecord = {
  name: string
  type: string
}

export type Student = {
  id: string
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
    { name: 'Joshua Rader', type: 'Primary' },
    { name: 'Joshua Rader', type: 'Preferred' },
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
