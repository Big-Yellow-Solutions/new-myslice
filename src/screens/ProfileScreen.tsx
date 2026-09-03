import { useState } from 'react'
import { AppBar } from '../components/AppBar'
import { IdHeader } from '../components/IdHeader'
import { TabBar } from '../components/TabBar'
import { Field } from '../components/Field'
import { AccordionSection } from '../components/AccordionSection'
import { NamesTable } from '../components/NamesTable'
import { newNameId, type NameRecord, type Student } from '../data/student'
import { useProfile } from '../hooks/useProfile'

type TabId = 'personal' | 'biographic'

const TABS = [
  { id: 'personal' as const, label: 'Personal' },
  { id: 'biographic' as const, label: 'Biographic' },
]

export function ProfileScreen() {
  const { profile, save, reset } = useProfile()
  const [tab, setTab] = useState<TabId>('personal')
  const [namesOpen, setNamesOpen] = useState(true)
  const [citizenshipOpen, setCitizenshipOpen] = useState(false)

  /** Non-null while editing: the working copy, thrown away on Cancel. */
  const [draft, setDraft] = useState<Student | null>(null)
  const [error, setError] = useState<string | null>(null)

  const editing = draft !== null
  const view = draft ?? profile

  function edit(patch: (current: Student) => Student) {
    setDraft((current) => (current ? patch(current) : current))
  }

  function startEditing() {
    setError(null)
    setDraft(profile)
  }

  function cancelEditing() {
    setError(null)
    setDraft(null)
  }

  function saveEditing() {
    if (!draft) return
    const result = save(draft)
    setDraft(null)
    setError(result.ok ? null : result.error)
  }

  function resetProfile() {
    if (!window.confirm('Discard your saved changes and restore the original profile?')) return
    reset()
    setDraft(null)
    setError(null)
  }

  function editName(id: string, patch: Partial<Omit<NameRecord, 'id'>>) {
    edit((current) => ({
      ...current,
      names: current.names.map((record) => (record.id === id ? { ...record, ...patch } : record)),
    }))
  }

  return (
    <div className="screen">
      <AppBar
        title="Profile"
        showDefaultActions={!editing}
        menuItems={[
          { label: 'Edit profile', onSelect: startEditing },
          { label: 'Reset to original profile', onSelect: resetProfile, danger: true },
        ]}
        actions={
          editing ? (
            <div className="appbar__edit-actions">
              <button type="button" className="appbar__button" onClick={cancelEditing}>
                Cancel
              </button>
              <button
                type="button"
                className="appbar__button appbar__button--primary"
                onClick={saveEditing}
              >
                Save
              </button>
            </div>
          ) : null
        }
      />

      <IdHeader
        studentId={view.id}
        photoUrl={view.photoUrl}
        editing={editing}
        onStudentIdChange={(id) => edit((current) => ({ ...current, id }))}
        onPhotoChange={(photoUrl) => edit((current) => ({ ...current, photoUrl }))}
      />

      {error ? (
        <p className="banner banner--error" role="alert">
          {error}
        </p>
      ) : null}

      <TabBar tabs={TABS} activeTab={tab} onChange={setTab} />

      {tab === 'personal' ? (
        <div className="tabpanel" role="tabpanel" id="panel-personal" aria-labelledby="tab-personal">
          <h2 className="tabpanel__heading">Personal Details</h2>

          <Field
            label="Date of Birth"
            value={view.dateOfBirth}
            className="field--dob"
            editing={editing}
            placeholder="MM/DD/YYYY"
            onChange={(dateOfBirth) => edit((current) => ({ ...current, dateOfBirth }))}
          />

          <AccordionSection
            id="names"
            label="Names"
            open={namesOpen}
            onToggle={() => setNamesOpen((open) => !open)}
          >
            <div className="info-badge" aria-hidden="true">
              i
            </div>
            <NamesTable
              names={view.names}
              editing={editing}
              onChange={editName}
              onRemove={(id) =>
                edit((current) => ({
                  ...current,
                  names: current.names.filter((record) => record.id !== id),
                }))
              }
              onAdd={() =>
                edit((current) => ({
                  ...current,
                  names: [...current.names, { id: newNameId(), name: '', type: '' }],
                }))
              }
            />
          </AccordionSection>

          <AccordionSection
            id="citizenship"
            label="Citizenship"
            open={citizenshipOpen}
            onToggle={() => setCitizenshipOpen((open) => !open)}
          >
            <div className="field-stack field-stack--tight">
              <Field
                label="Country"
                value={view.citizenship.country}
                editing={editing}
                onChange={(country) =>
                  edit((current) => ({
                    ...current,
                    citizenship: { ...current.citizenship, country },
                  }))
                }
              />
              <Field
                label="Citizenship Status"
                value={view.citizenship.status}
                editing={editing}
                onChange={(status) =>
                  edit((current) => ({
                    ...current,
                    citizenship: { ...current.citizenship, status },
                  }))
                }
              />
            </div>
          </AccordionSection>
        </div>
      ) : (
        <div
          className="tabpanel"
          role="tabpanel"
          id="panel-biographic"
          aria-labelledby="tab-biographic"
        >
          <h2 className="tabpanel__heading">Biographic Details</h2>
          <div className="field-stack">
            <Field
              label="Gender"
              value={view.biographic.gender}
              editing={editing}
              onChange={(gender) =>
                edit((current) => ({ ...current, biographic: { ...current.biographic, gender } }))
              }
            />
            <Field
              label="Marital Status"
              value={view.biographic.maritalStatus}
              editing={editing}
              onChange={(maritalStatus) =>
                edit((current) => ({
                  ...current,
                  biographic: { ...current.biographic, maritalStatus },
                }))
              }
            />
            <Field
              label="Military Status"
              value={view.biographic.militaryStatus}
              editing={editing}
              onChange={(militaryStatus) =>
                edit((current) => ({
                  ...current,
                  biographic: { ...current.biographic, militaryStatus },
                }))
              }
            />
          </div>
        </div>
      )}
    </div>
  )
}
