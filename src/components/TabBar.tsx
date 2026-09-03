type Tab<Id extends string> = {
  id: Id
  label: string
}

type TabBarProps<Id extends string> = {
  tabs: Tab<Id>[]
  activeTab: Id
  onChange: (id: Id) => void
}

export function TabBar<Id extends string>({ tabs, activeTab, onChange }: TabBarProps<Id>) {
  return (
    <div className="tabbar" role="tablist">
      {tabs.map((tab) => {
        const active = tab.id === activeTab
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={active}
            aria-controls={`panel-${tab.id}`}
            className={`tabbar__tab${active ? ' tabbar__tab--active' : ''}`}
            onClick={() => onChange(tab.id)}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}
