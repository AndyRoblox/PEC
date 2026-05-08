import { useState, useRef } from 'react'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { SectionTabs, type TabId } from './components/SectionTabs'
import { FolletoPECTab } from './components/tabs/FolletoPECTab'
import { GraficosTab } from './components/tabs/GraficosTab'
import { JuegoTab } from './components/tabs/JuegoTab'

function App() {
  const [activeTab, setActiveTab] = useState<TabId>('folleto')
  const tabsRef = useRef<HTMLDivElement>(null)

  const scrollToTabs = () => tabsRef.current?.scrollIntoView({ behavior: 'smooth' })

  const handleVerMas = () => scrollToTabs()

  const handleExplorarGraficos = () => {
    setActiveTab('graficos')
    scrollToTabs()
  }

  return (
    <div className="min-h-svh bg-piedra font-sans">
      <Navbar />
      <Hero onVerMas={handleVerMas} onExplorarGraficos={handleExplorarGraficos} />
      <div ref={tabsRef}>
        <SectionTabs activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      <main>
        {activeTab === 'folleto'  && <FolletoPECTab />}
        {activeTab === 'graficos' && <GraficosTab />}
        {activeTab === 'juego'    && <JuegoTab />}
      </main>
    </div>
  )
}

export default App
