import { useState } from 'react'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { SectionTabs, type TabId } from './components/SectionTabs'
import { FolletoPECTab } from './components/tabs/FolletoPECTab'
import { GraficosTab } from './components/tabs/GraficosTab'
import { JuegoTab } from './components/tabs/JuegoTab'

function App() {
  const [activeTab, setActiveTab] = useState<TabId>('folleto')

  return (
    <div className="min-h-svh bg-piedra font-sans">
      <Navbar />
      <Hero />
      <SectionTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <main>
        {activeTab === 'folleto'  && <FolletoPECTab />}
        {activeTab === 'graficos' && <GraficosTab />}
        {activeTab === 'juego'    && <JuegoTab />}
      </main>
    </div>
  )
}

export default App
