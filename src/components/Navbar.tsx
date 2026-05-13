
export function Navbar() {
  return (
    <nav className="bg-primary h-20 flex items-center justify-between px-6 sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <img src="logo.png" alt="Logo PEC" className="w-16 h-16 object-contain" />
        <span className="text-white font-heading font-semibold text-sm tracking-wide">PEC</span>
        <span className="text-white/60 text-sm hidden sm:block">Contra las drogas</span>
      </div>
      <div className="hidden md:flex items-center gap-6">
      </div>
    </nav>
  )
}
