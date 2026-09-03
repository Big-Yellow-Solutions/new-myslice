import { useState } from 'react'
import { AppBar } from '../components/AppBar'
import { IdHeader } from '../components/IdHeader'
import { TabBar } from '../components/TabBar'
import { Field } from '../components/Field'
import { AccordionSection } from '../components/AccordionSection'
import { NamesTable } from '../components/NamesTable'
import { student } from '../data/student'

type TabId = 'personal' | 'biographic'

const TABS = [
  { id: 'personal' as const, label: 'Personal' },
  { id: 'biographic' as const, label: 'Biographic' },
]

export function ProfileScreen() {
  const [tab, setTab] = useState<TabId>('personal')
  const [namesOpen, setNamesOpen] = useState(true)
  const [citizenshipOpen, setCitizenshipOpen] = useState(false)

  return (
    <div className="screen">
      <AppBar title="Profile" />
      <IdHeader studentId={student.id} photoUrl={student.photoUrl} />
      <TabBar tabs={TABS} activeTab={tab} onChange={setTab} />

      {tab === 'personal' ? (
        <div className="tabpanel" role="tabpanel" id="panel-personal" aria-labelledby="tab-personal">
          <h2 className="tabpanel__heading">Personal Details</h2>

          <Field label="Date of Birth" value={student.dateOfBirth} className="field--dob" />

          <AccordionSection
            id="names"
            label="Names"
            open={namesOpen}
            onToggle={() => setNamesOpen((open) => !open)}
          >
            <div className="info-badge" aria-hidden="true">
              i
            </div>
            <NamesTable names={student.names} />
          </AccordionSection>

          <AccordionSection
            id="citizenship"
            label="Citizenship"
            open={citizenshipOpen}
            onToggle={() => setCitizenshipOpen((open) => !open)}
          >
            <div className="field-stack field-stack--tight">
              <Field label="Country" value={student.citizenship.country} />
              <Field label="Citizenship Status" value={student.citizenship.status} />
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
            <Field label="Gender" value={student.biographic.gender} />
            <Field label="Marital Status" value={student.biographic.maritalStatus} />
            <Field label="Military Status" value={student.biographic.militaryStatus} />
          </div>
        </div>
      )}
    </div>
  )
}
