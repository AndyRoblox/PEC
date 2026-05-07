import { useState, useEffect } from 'react'

function ChevronLeft() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  )
}

function ChevronRight() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  )
}

function ImagePlaceholder({ index, bg }: { index: number; bg: string }) {
  return (
    <div className={`w-full h-full flex flex-col items-center justify-center gap-3 ${bg}`}>
      <div className="w-20 h-20 rounded-2xl bg-white/40 flex items-center justify-center">
        <svg className="w-10 h-10 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
      <p className="text-white/70 text-sm font-heading font-medium">Imagen del folleto {index}</p>
      <p className="text-white/40 text-xs">Placeholder — reemplazar con imagen real</p>
    </div>
  )
}

export function FolletoPECTab() {
  const [active, setActive] = useState(0)

  /* Auto-advance every 5 s */
  useEffect(() => {
    const id = setInterval(() => setActive((p) => (p + 1) % 2), 5000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="p-6 bg-piedra min-h-96">
      <h2 className="font-heading text-primary-dark text-xl font-medium mb-5">Folleto PEC</h2>

      <div className="relative overflow-hidden rounded-2xl shadow-sm max-w-3xl mx-auto aspect-[16/10]">
        {/*
          Strip technique: two images side-by-side in a 200%-wide row.
          Shifting the strip by -50% reveals the second image.
          -translate-x-1/2 = -50% of element width = -100% of container. ✓
        */}
        <div
          className="flex h-full transition-transform duration-500 ease-in-out"
          style={{ width: '200%', transform: active === 0 ? 'translateX(0)' : 'translateX(-50%)' }}
        >
          <div className="w-1/2 h-full">
            <ImagePlaceholder index={1} bg="bg-dorado/70" />
          </div>
          <div className="w-1/2 h-full">
            <ImagePlaceholder index={2} bg="bg-primary/70" />
          </div>
        </div>

        {/* Arrow buttons */}
        <button
          onClick={() => setActive((p) => (p - 1 + 2) % 2)}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white border border-gray-100 flex items-center justify-center shadow-sm transition-all duration-200 cursor-pointer text-gray-600"
          aria-label="Anterior"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() => setActive((p) => (p + 1) % 2)}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white border border-gray-100 flex items-center justify-center shadow-sm transition-all duration-200 cursor-pointer text-gray-600"
          aria-label="Siguiente"
        >
          <ChevronRight />
        </button>

        {/* Dot indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {[0, 1].map((i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Imagen ${i + 1}`}
              className={[
                'rounded-full transition-all duration-300 cursor-pointer',
                active === i
                  ? 'w-5 h-2.5 bg-white'
                  : 'w-2.5 h-2.5 bg-white/50 hover:bg-white/70',
              ].join(' ')}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
