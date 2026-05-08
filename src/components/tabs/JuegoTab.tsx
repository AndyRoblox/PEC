export function JuegoTab() {
  return (
    <div className="p-6 bg-piedra">
      <h2 className="font-heading text-primary-dark text-xl font-medium mb-1">Juego</h2>
      <p className="text-sm text-gray-400 mb-5">
        Juego interactivo para explorar las consecuencias del consumo de drogas.
      </p>

      <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm bg-white">
        {/* Django game iframe — src to be configured */}
        <iframe
          src="https://pecandres-zdxa.vercel.app/juego/"
          title="Juego PEC"
          className="w-full h-[600px] block"
          allowFullScreen
        />
      </div>
    </div>
  )
}
