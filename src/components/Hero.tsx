export function Hero() {
  return (
    <section className="bg-crema relative overflow-hidden px-10 py-14">
      {/* Decorative blobs */}
      <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-dorado opacity-35 pointer-events-none" />
      <div className="absolute -bottom-10 -left-5 w-[120px] h-[120px] rounded-full bg-primary opacity-15 pointer-events-none" />
      <div className="absolute bottom-5 right-16 w-16 h-16 rounded-full bg-rosa opacity-20 pointer-events-none" />

      {/* Text content */}
      <div className="max-w-xl relative z-10">
        <span className="inline-flex items-center bg-primary text-white text-xs px-3 py-1 rounded-full mb-4 tracking-widest uppercase font-medium font-heading">
          Orientación vocacional
        </span>

        <h1 className="text-4xl font-heading font-medium text-primary-dark leading-tight mb-3">
          Decide tu futuro:<br />
          <span className="text-primary">Estás a tiempo</span>
        </h1>

        <p className="text-sm text-gray-500 leading-relaxed mb-7 max-w-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Explora carreras, descubre tus
          habilidades y toma decisiones informadas sobre tu educación superior.
        </p>

        <div className="flex items-center gap-3 flex-wrap">
          <button className="bg-primary text-white px-7 py-2.5 rounded-full text-sm font-medium hover:bg-primary-dark transition-colors duration-200 cursor-pointer">
            Ver más →
          </button>
          <button className="bg-transparent text-primary px-5 py-2.5 rounded-full text-sm border-2 border-primary hover:bg-primary hover:text-white transition-colors duration-200 cursor-pointer">
            Explorar carreras
          </button>
        </div>
      </div>

      {/* Illustration placeholder */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 w-44 h-40 bg-white/80 rounded-xl border-2 border-dashed border-gray-200 hidden md:flex flex-col items-center justify-center gap-2">
        <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
        <span className="text-xs text-gray-300">Ilustración</span>
      </div>

      {/* Stat pills */}
      <div className="absolute right-[260px] top-8 hidden lg:flex gap-2">
        <div className="bg-white rounded-full px-3.5 py-1.5 flex items-center gap-2 border border-gray-100 shadow-sm">
          <div className="w-2 h-2 rounded-full bg-dorado flex-shrink-0" />
          <span className="text-xs text-gray-500">+200 carreras</span>
        </div>
        <div className="bg-white rounded-full px-3.5 py-1.5 flex items-center gap-2 border border-gray-100 shadow-sm">
          <div className="w-2 h-2 rounded-full bg-rosa flex-shrink-0" />
          <span className="text-xs text-gray-500">Gratis</span>
        </div>
      </div>
    </section>
  )
}
