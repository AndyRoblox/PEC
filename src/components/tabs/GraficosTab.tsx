import { useState } from 'react'
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

  return (
    <div className="p-6 bg-piedra">
      {/* Section heading */}
      <div className="mb-5">
        <h2 className="font-heading text-primary-dark text-xl font-medium">Resultados</h2>
        <p className="text-sm text-gray-400 mt-1">
          Estadísticas clave sobre el consumo de drogas en adolescentes, con un video explicativo.
        </p>
      </div>

      {/*
        Layout: charts on the left, expanding video panel on the right.
        The video panel is positioned absolute so it can overlay charts as it
        expands from a 56-px strip to full width. CSS width transitions work
        between resolved pixel values, so % ↔ fixed rem both animate smoothly.
      */}
      <div className="relative" style={{ minHeight: '520px' }}>

        {/* Charts area — fades out when video opens */}
        <div
          className={[
            'pr-14 flex flex-col gap-4 transition-opacity duration-300',
            videoOpen ? 'opacity-0 pointer-events-none' : 'opacity-100',
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

        {/* ── Ver video panel ──────────────────────────────────── */}
        <div
          className="absolute right-0 top-0 bottom-0 bg-primary rounded-xl z-10 overflow-hidden
                     transition-all duration-500 ease-in-out flex flex-col"
          style={{ width: videoOpen ? '100%' : '3.5rem' }}
        >
          {!videoOpen ? (
            /* Collapsed: vertical label button */
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
            /* Expanded: video embed area */
            <div key="video" className="flex flex-col h-full p-5 animate-fade-in-up">
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

              {/* YouTube iframe — src to be filled in later */}
              <div className="flex-1 rounded-xl overflow-hidden bg-black/20 min-h-0">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/CiYk_G4tEmQ"
                  title="Consumo de drogas experimentales en adolescentes disminuye en México: ENCODAT 2025 I Informe Capital"
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
    </div>
  )
}
