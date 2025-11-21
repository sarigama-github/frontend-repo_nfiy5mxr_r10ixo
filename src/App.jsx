import { useEffect, useMemo, useState } from 'react'
import Navbar from './components/Navbar'
import ProductCard from './components/ProductCard'
import Cart from './components/Cart'

function App() {
  const [products, setProducts] = useState([])
  const [filtered, setFiltered] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [category, setCategory] = useState('All')

  const categories = useMemo(() => {
    const cats = Array.from(new Set(products.map(p => p.category))).sort()
    return ['All', ...cats]
  }, [products])

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      setError('')
      try {
        const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(`${baseUrl}/api/products`)
        if (!res.ok) throw new Error('Failed to load products')
        const data = await res.json()
        setProducts(data)
        setFiltered(data)
        if (data.length === 0) {
          // try seeding on empty
          const seed = await fetch(`${baseUrl}/api/products/seed`, { method: 'POST' })
          if (seed.ok) {
            const again = await fetch(`${baseUrl}/api/products`)
            if (again.ok) {
              const seeded = await again.json()
              setProducts(seeded)
              setFiltered(seeded)
            }
          }
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const handleSearch = (q) => {
    const query = q.trim().toLowerCase()
    const base = category === 'All' ? products : products.filter(p => p.category === category)
    if (!query) return setFiltered(base)
    setFiltered(base.filter(p =>
      p.title.toLowerCase().includes(query) ||
      (p.description || '').toLowerCase().includes(query) ||
      (p.category || '').toLowerCase().includes(query)
    ))
  }

  const handleCategory = (cat) => {
    setCategory(cat)
    if (cat === 'All') return setFiltered(products)
    setFiltered(products.filter(p => p.category === cat))
  }

  const addToCart = (product) => {
    setCartOpen(true)
    setCart(prev => {
      const exists = prev.find(i => i.id === product.id)
      if (exists) {
        return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i)
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar onSearch={handleSearch} />

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Civil engineering supplies</h1>
            <p className="text-slate-600">Concrete, steel, aggregates, cement and more.</p>
          </div>
          <button onClick={() => setCartOpen(true)} className="rounded-lg bg-blue-600 text-white px-4 py-2 text-sm font-medium hover:bg-blue-700">
            Cart ({cart.reduce((s,i)=>s+i.quantity,0)})
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => handleCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-sm border ${category===cat? 'bg-blue-600 text-white border-blue-600' : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid place-items-center py-20 text-slate-600">Loading products...</div>
        ) : error ? (
          <div className="grid place-items-center py-20 text-red-600">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {filtered.map(p => (
              <ProductCard key={p.id} product={p} onAdd={addToCart} />
            ))}
          </div>
        )}
      </section>

      {cartOpen && (
        <Cart items={cart} onClose={() => setCartOpen(false)} />
      )}

      <footer className="border-t border-slate-200 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-sm text-slate-500 flex items-center justify-between">
          <p>© {new Date().getFullYear()} CivilMart. All rights reserved.</p>
          <a href="/test" className="hover:text-slate-700">System status</a>
        </div>
      </footer>
    </div>
  )
}

export default App
