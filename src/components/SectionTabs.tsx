export type TabId = 'folleto' | 'graficos' | 'juego'

const TABS: { id: TabId; label: string }[] = [
  { id: 'folleto',  label: 'Folleto PEC' },
  { id: 'graficos', label: 'Gráficos'    },
  { id: 'juego',    label: 'Juego'       },
]

interface SectionTabsProps {
  activeTab: TabId
  onTabChange: (tab: TabId) => void
}

export function SectionTabs({ activeTab, onTabChange }: SectionTabsProps) {
  return (
    <div className="bg-white border-b border-gray-100 px-6 flex items-center overflow-x-auto sticky top-12 z-40">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={[
            'px-5 py-3.5 text-sm font-medium whitespace-nowrap cursor-pointer transition-colors duration-200',
            'border-b-2 -mb-px',
            activeTab === tab.id
              ? 'text-primary border-primary'
              : 'text-gray-400 border-transparent hover:text-gray-600',
          ].join(' ')}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
