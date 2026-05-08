import { useState, useCallback, useEffect } from 'react'

const SLIDES = [
  { src: '/1.png', alt: 'Folleto PEC – página 1' },
  { src: '/2.png', alt: 'Folleto PEC – página 2' },
]

export function FolletoPECTab() {
  const [current, setCurrent] = useState(0)

  const prev = useCallback(() => setCurrent(c => (c - 1 + SLIDES.length) % SLIDES.length), [])
  const next = useCallback(() => setCurrent(c => (c + 1) % SLIDES.length), [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [prev, next])

  return (
    <div className="p-6 bg-piedra min-h-96 flex flex-col">

      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-heading text-primary-dark text-xl font-medium">Folleto PEC</h2>
          <p className="text-sm text-gray-400 mt-1">Material informativo del programa</p>
        </div>
        <a
          href="/folleto.pdf"
          download
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm font-heading font-medium
                     hover:bg-primary-dark transition-colors duration-200 cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Descargar PDF
        </a>
      </div>

      {/* ── Carousel ── */}
      <div className="flex flex-col items-center gap-5 flex-1">

        {/* Clay card */}
        <div
          className="relative w-full max-w-2xl rounded-3xl overflow-hidden border-4 border-white bg-white
                     shadow-[0_6px_0_0_#2d4d47,0_10px_32px_rgba(71,122,114,0.20)]"
          style={{ minHeight: '480px' }}
        >
          {/* Image strip */}
          <div
            className="flex h-full transition-transform duration-300 ease-in-out"
            style={{
              width: `${SLIDES.length * 100}%`,
              transform: `translateX(-${(current * 100) / SLIDES.length}%)`,
            }}
          >
            {SLIDES.map((slide, i) => (
              <div
                key={i}
                className="flex items-center justify-center bg-white"
                style={{ width: `${100 / SLIDES.length}%`, minHeight: '480px' }}
              >
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className="w-full h-full object-contain"
                  style={{ minHeight: '480px' }}
                  loading={i === 0 ? 'eager' : 'lazy'}
                />
              </div>
            ))}
          </div>

          {/* Page badge */}
          <div
            className="absolute top-4 right-4 px-3 py-1 rounded-full bg-dorado text-primary-dark
                       text-xs font-heading font-medium shadow-[0_3px_0_0_#c9a040] select-none"
          >
            {current + 1} / {SLIDES.length}
          </div>

          {/* Prev arrow */}
          <button
            onClick={prev}
            aria-label="Imagen anterior"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center
                       bg-white border-[3px] border-white cursor-pointer
                       shadow-[0_4px_0_0_#d1d5db,0_6px_16px_rgba(0,0,0,0.08)]
                       hover:bg-dorado hover:shadow-[0_4px_0_0_#c9a040] active:translate-y-[-46%] active:shadow-none
                       transition-all duration-150 focus-visible:outline-2 focus-visible:outline-primary"
          >
            <svg className="w-5 h-5 text-primary-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Next arrow */}
          <button
            onClick={next}
            aria-label="Imagen siguiente"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center
                       bg-white border-[3px] border-white cursor-pointer
                       shadow-[0_4px_0_0_#d1d5db,0_6px_16px_rgba(0,0,0,0.08)]
                       hover:bg-dorado hover:shadow-[0_4px_0_0_#c9a040] active:translate-y-[-46%] active:shadow-none
                       transition-all duration-150 focus-visible:outline-2 focus-visible:outline-primary"
          >
            <svg className="w-5 h-5 text-primary-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex items-center gap-2" role="tablist" aria-label="Navegación de imágenes">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === current}
              aria-label={`Ir a imagen ${i + 1}`}
              onClick={() => setCurrent(i)}
              className={[
                'rounded-full cursor-pointer transition-all duration-200',
                'shadow-[0_2px_0_0_rgba(0,0,0,0.12)] hover:shadow-[0_2px_0_0_rgba(0,0,0,0.20)]',
                i === current
                  ? 'w-7 h-3.5 bg-primary'
                  : 'w-3.5 h-3.5 bg-gray-300 hover:bg-primary/50',
              ].join(' ')}
            />
          ))}
        </div>

      </div>
    </div>
  )
}
