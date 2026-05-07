const NAV_ITEMS = ['Inicio', 'Carreras', 'Test', 'Recursos']

export function Navbar() {
  return (
    <nav className="bg-primary h-12 flex items-center justify-between px-6 sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-dorado flex-shrink-0" />
        <span className="text-white font-heading font-semibold text-sm tracking-wide">PEC</span>
        <span className="text-white/60 text-sm hidden sm:block">Orientación Vocacional</span>
      </div>
      <div className="hidden md:flex items-center gap-6">
        {NAV_ITEMS.map((item) => (
          <a
            key={item}
            href="#"
            className="text-white/60 text-sm hover:text-white transition-colors duration-200 cursor-pointer"
          >
            {item}
          </a>
        ))}
      </div>
    </nav>
  )
}
