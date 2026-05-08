const PDF_SRC = '/folleto.pdf'

export function FolletoPECTab() {
  return (
    <div className="p-6 bg-piedra min-h-96 flex flex-col">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="font-heading text-primary-dark text-xl font-medium">Folleto PEC</h2>
          <p className="text-sm text-gray-400 mt-1">Material informativo del programa</p>
        </div>
        <a
          href={PDF_SRC}
          download
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm font-heading font-medium
                     hover:bg-primary-dark transition-colors duration-200"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Descargar
        </a>
      </div>

      <div className="flex-1 rounded-2xl overflow-hidden border border-gray-100 shadow-sm bg-white" style={{ minHeight: '600px' }}>
        <iframe
          src={PDF_SRC}
          title="Folleto PEC"
          className="w-full h-full"
          style={{ minHeight: '600px', border: 'none' }}
        />
      </div>
    </div>
  )
}
