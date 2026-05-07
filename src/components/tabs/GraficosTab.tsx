import { useState } from 'react'
import { BarChart } from '../charts/BarChart'

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
  { label: 'Ciencias',    value: 87, color: '#477a72' },
  { label: 'Tecnología',  value: 65, color: '#ffd06d' },
  { label: 'Arte',        value: 82, color: '#477a72' },
  { label: 'Negocios',    value: 55, color: '#ffd06d' },
  { label: 'Salud',       value: 45, color: '#fa7995' },
]

const PROGRESS_DATA = [
  { label: 'Ene', value: 70, color: '#477a72' },
  { label: 'Feb', value: 45, color: '#477a72' },
  { label: 'Mar', value: 85, color: '#477a72' },
  { label: 'Abr', value: 55, color: '#ffd06d' },
  { label: 'May', value: 35, color: '#fa7995' },
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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit
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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <StatCard label="Lorem ipsum dolor sit" value="87%" hexColor="#477a72" progress={87} />
            <StatCard label="Lorem ipsum dolor sit" value="12"  hexColor="#ffd06d" progress={60} />
            <StatCard label="Lorem ipsum dolor sit" value="4.2" hexColor="#fa7995" progress={42} />
          </div>

          {/* Chart cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <BarChart
              data={AREAS_DATA}
              title="Áreas de interés"
              subtitle="Distribución de resultados del test vocacional"
              className="min-h-[220px]"
            />
            <BarChart
              data={PROGRESS_DATA}
              title="Progreso mensual"
              subtitle="Actividad de exploración por mes"
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
