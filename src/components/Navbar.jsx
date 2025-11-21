import { useState } from 'react'

function Navbar({ onSearch }) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch?.(query)
  }

  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/50 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white font-bold">CE</span>
            <span className="font-semibold text-slate-800">CivilMart</span>
          </a>

          <form onSubmit={handleSubmit} className="hidden md:flex items-center gap-2 w-1/2">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search materials, tools, brands..."
              className="w-full rounded-lg border border-slate-300 bg-white/90 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button type="submit" className="rounded-lg bg-blue-600 text-white px-3 py-2 text-sm font-medium hover:bg-blue-700">
              Search
            </button>
          </form>

          <nav className="flex items-center gap-3">
            <a href="#" className="text-sm text-slate-600 hover:text-slate-900">About</a>
            <a href="#" className="text-sm text-slate-600 hover:text-slate-900">Contact</a>
          </nav>
        </div>
        <form onSubmit={handleSubmit} className="md:hidden pb-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search materials, tools, brands..."
            className="w-full rounded-lg border border-slate-300 bg-white/90 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </form>
      </div>
    </header>
  )
}

export default Navbar
