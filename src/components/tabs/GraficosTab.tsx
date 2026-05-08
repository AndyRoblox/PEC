import { useState, useEffect } from 'react'
import { BarChart } from '../charts/BarChart'
import { PieChart } from '../charts/PieChart'
import { FrequencyPolygon } from '../charts/Histogram'

/* ── Local stat card ─────────────────────────────────────────── */
function StatCard({
  label,
  value,
  hexColor,
  progress,
}: {
  label: string
  value: string
  hexColor: string
  progress: number
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4">
      <p className="text-xs text-gray-400 mb-2 truncate">{label}</p>
      <p className="text-3xl font-heading font-medium leading-none" style={{ color: hexColor }}>
        {value}
      </p>
      <div className="h-1.5 bg-gray-100 rounded-full mt-3 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${progress}%`, backgroundColor: hexColor }}
        />
      </div>
    </div>
  )
}

/* ── Placeholder data ────────────────────────────────────────── */
const AREAS_DATA = [
  { label: 'Adicción',    value: 40, color: '#477a72' },
  { label: 'Violencia',  value: 30, color: '#ffd06d' },
  { label: 'Problemas familiares',        value: 20, color: '#477a72' },
  { label: 'Problemas escolares/laborales',    value: 15, color: '#ffd06d' },
  { label: 'Daños a la salud mental',       value: 25, color: '#fa7995' },
  { label: 'Sobredosis',       value: 10, color: '#477a72' },
]

const SUBSTANCE_DATA = [
  { label: 'Alcohol', value: 100, color: '#477a72' },
  { label: 'Tabaco', value: 75, color: '#477a72' },
  { label: 'Marihuana', value: 60, color: '#477a72' },
  { label: 'Inhalantes', value: 40, color: '#ffd06d' },
  { label: 'Metanfetaminas', value: 30, color: '#fa7995' },
  { label: 'Cocaína', value: 20, color: '#a78bfa' },
]

const PIE_DATA = [
  { label: '12-14 Años',          value: 20, color: '#477a72' },
  { label: '15-17 Años',         value: 45, color: '#ffd06d' },
  { label: '18-25 Años', value: 25, color: '#fa7995' },
  { label: '26+ Años',             value: 10, color: '#a78bfa' },
]

const POLYGON_LABELS = ['2026', '2027', '2028', '2029', '2030', '2031']
const POLYGON_SERIES = [
  { name: 'Alcohol', color: '#477a72', values: [20, 19.5, 19, 18.5, 18.2, 18] },
  { name: 'Cannabis', color: '#fa7995', values: [13.3, 14, 14.8, 15.5, 16, 16.6] },
  { name: 'Sintéticos', color: '#ffd06d', values: [1.5, 2.5, 3.5, 4.5, 5.5, 6] },
]

/* ── Tab component ───────────────────────────────────────────── */
export function GraficosTab() {
  const [videoOpen, setVideoOpen] = useState(false)

  /* Lock body scroll while mobile sheet is open */
  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 767px)').matches
    if (isMobile && videoOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [videoOpen])

  return (
    <div className="p-6 pb-20 md:pb-6 bg-piedra">
      {/* Section heading */}
      <div className="mb-5">
        <h2 className="font-heading text-primary-dark text-xl font-medium">Resultados</h2>
        <p className="text-sm text-gray-400 mt-1">
          Estadísticas clave sobre el consumo de drogas en adolescentes, con un video explicativo.
        </p>
      </div>

      {/*
        Desktop layout: charts on the left, expanding video panel on the right.
        Mobile layout: charts full-width; video lives in the fixed bottom sheet.
      */}
      <div className="relative" style={{ minHeight: '520px' }}>

        {/* Charts area */}
        <div
          className={[
            'md:pr-14 flex flex-col gap-4 transition-opacity duration-300',
            videoOpen ? 'md:opacity-0 md:pointer-events-none' : 'opacity-100',
          ].join(' ')}
        >
          {/* Stat cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <StatCard label="Porcentaje de consumo en menores (a la BAJA)" value="4.1%" hexColor="#477a72" progress={4.1} />
            <StatCard label="Porcentaje de consumo en adultos (a la ALTA)" value="14.6%" hexColor="#fa7995" progress={14.6} />
          </div>

          {/* Chart cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <BarChart
              data={AREAS_DATA}
              title="Problemáticas sociales"
              subtitle="Problemáticas sociales asociadas al consumo de drogas"
              className="min-h-[220px]"
            />
            <PieChart
              data={PIE_DATA}
              title="Edad de inicio del consumo"
              subtitle="Proporción por rango de edad al iniciar consumo de drogas"
              className="min-h-[220px]"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <BarChart
              data={SUBSTANCE_DATA}
              title="Sustancias más consumidas"
              subtitle="Sustancias más consumidas por adolescentes"
              className="min-h-[220px]"
            />
            <FrequencyPolygon
              labels={POLYGON_LABELS}
              series={POLYGON_SERIES}
              title="Proyección de consumo futuro"
              subtitle="Pronóstico por sustancia a 5 años"
              className="min-h-[220px]"
            />
          </div>
        </div>

        {/* ── Desktop: right-side expanding panel ──────────────── */}
        <div
          className="hidden md:flex absolute right-0 top-0 bottom-0 bg-primary rounded-xl z-10 overflow-hidden
                     transition-all duration-500 ease-in-out flex-col"
          style={{ width: videoOpen ? '100%' : '3.5rem' }}
        >
          {!videoOpen ? (
            <button
              onClick={() => setVideoOpen(true)}
              className="w-full h-full flex items-center justify-center cursor-pointer group"
              aria-label="Ver video"
            >
              <span
                className="text-white text-xs font-heading font-semibold tracking-[0.15em] uppercase
                           opacity-80 group-hover:opacity-100 transition-opacity
                           [writing-mode:vertical-rl] rotate-180"
              >
                Ver video
              </span>
            </button>
          ) : (
            <div key="video-desktop" className="flex flex-col h-full p-5 animate-fade-in-up">
              <div className="flex items-center justify-between mb-4 flex-shrink-0">
                <h3 className="text-white font-heading font-semibold text-lg">Video explicativo</h3>
                <button
                  onClick={() => setVideoOpen(false)}
                  className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center
                             text-white/70 hover:text-white transition-colors cursor-pointer"
                  aria-label="Cerrar video"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex-1 rounded-xl overflow-hidden bg-black/20 min-h-0">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/CiYk_G4tEmQ"
                  title="Consumo de drogas experimentales en adolescentes"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Mobile: fixed bottom sheet ──────────────────────────── */}
      <>
        {/* Scrim — tapping it collapses the sheet */}
        <div
          className={[
            'md:hidden fixed inset-0 z-40 bg-black/50 transition-opacity duration-300',
            videoOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
          ].join(' ')}
          aria-hidden="true"
          onClick={() => setVideoOpen(false)}
        />

        {/* Sheet */}
        <div
          className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex flex-col bg-primary rounded-t-3xl
                     transition-transform duration-400 ease-in-out
                     motion-reduce:transition-none"
          style={{
            height: '85svh',
            transform: videoOpen ? 'translateY(0)' : 'translateY(calc(100% - 3.5rem))',
          }}
          aria-expanded={videoOpen}
        >
          {/* Handle bar + trigger button */}
          <button
            onClick={() => setVideoOpen(v => !v)}
            className="flex flex-col items-center justify-center gap-1 pt-2.5 pb-2 w-full cursor-pointer
                       focus-visible:outline-2 focus-visible:outline-white/60 rounded-t-3xl"
            aria-label={videoOpen ? 'Cerrar video' : 'Ver video'}
          >
            <div className="w-10 h-1 bg-white/30 rounded-full" />
            <div className="flex items-center gap-2">
              {!videoOpen && (
                <svg className="w-4 h-4 text-white/80" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
              <span className="text-white text-sm font-heading font-semibold tracking-wide">
                {videoOpen ? 'Cerrar video' : 'Ver video'}
              </span>
              <svg
                className={`w-4 h-4 text-white/80 transition-transform duration-300 ${videoOpen ? 'rotate-180' : ''}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
              </svg>
            </div>
          </button>

          {/* Video content area */}
          <div className="flex-1 px-4 pb-6 min-h-0">
            <div className="rounded-2xl overflow-hidden bg-black/20 h-full">
              {videoOpen && (
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/CiYk_G4tEmQ"
                  title="Consumo de drogas experimentales en adolescentes"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              )}
            </div>
          </div>
        </div>
      </>
    </div>
  )
}
