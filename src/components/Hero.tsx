interface HeroProps {
  onVerMas: () => void
  onExplorarGraficos: () => void
}

export function Hero({ onVerMas, onExplorarGraficos }: HeroProps) {
  return (
    <section className="bg-crema relative overflow-hidden px-10 py-14">
      {/* Decorative blobs */}
      <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-dorado opacity-35 pointer-events-none" />
      <div className="absolute -bottom-10 -left-5 w-[120px] h-[120px] rounded-full bg-primary opacity-15 pointer-events-none" />
      <div className="absolute bottom-5 right-16 w-16 h-16 rounded-full bg-rosa opacity-20 pointer-events-none" />

      {/* Text content */}
      <div className="max-w-xl relative z-10">

        <h1 className="text-4xl font-heading font-medium text-primary-dark leading-tight mb-3">
          Decide tu futuro:<br />
          <span className="text-primary">Estás a tiempo</span>
        </h1>

        <p className="text-sm text-gray-500 leading-relaxed mb-7 max-w-sm">
          Informate sobre las consecuencias del consumo de drogas y sus consecuencias activas en la sociedad
        </p>

        <div className="flex items-center gap-3 flex-wrap">
          <button onClick={onVerMas} className="bg-primary text-white px-7 py-2.5 rounded-full text-sm font-medium hover:bg-primary-dark transition-colors duration-200 cursor-pointer">
            Ver más →
          </button>
          <button onClick={onExplorarGraficos} className="bg-transparent text-primary px-5 py-2.5 rounded-full text-sm border-2 border-primary hover:bg-primary hover:text-white transition-colors duration-200 cursor-pointer">
            Explorar gráficos
          </button>
        </div>
      </div>

      {/* Illustration placeholder */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 w-44 h-40  rounded-xl hidden md:flex flex-col items-center justify-center gap-2">
        <img src="logo.png" alt="Ilustración cecytem" className="w-36 h-36 object-contain" />
        
      </div>
    </section>
  )
}
