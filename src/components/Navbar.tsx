
export function Navbar() {
  return (
    <nav className="bg-primary h-12 flex items-center justify-between px-6 sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-dorado flex-shrink-0" />
        <span className="text-white font-heading font-semibold text-sm tracking-wide">PEC</span>
        <span className="text-white/60 text-sm hidden sm:block">Orientación Vocacional</span>
      </div>
      <div className="hidden md:flex items-center gap-6">
      </div>
    </nav>
  )
}
