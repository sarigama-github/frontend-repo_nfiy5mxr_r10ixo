function ProductCard({ product, onAdd }) {
  return (
    <div className="group rounded-xl border border-slate-200 bg-white/80 backdrop-blur p-3 shadow-sm hover:shadow-md transition-all">
      <div className="aspect-[4/3] overflow-hidden rounded-lg bg-slate-100">
        {product.image ? (
          <img src={product.image} alt={product.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform" />
        ) : (
          <div className="h-full w-full grid place-items-center text-slate-400 text-sm">No image</div>
        )}
      </div>
      <div className="pt-3">
        <h3 className="font-medium text-slate-800 line-clamp-2 min-h-[3.25rem]">{product.title}</h3>
        <p className="text-sm text-slate-500 line-clamp-2 min-h-[2.5rem]">{product.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="font-semibold text-slate-900">${product.price}</span>
          <button
            onClick={() => onAdd?.(product)}
            className="rounded-lg bg-blue-600 text-white px-3 py-2 text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
            disabled={!product.in_stock}
          >
            {product.in_stock ? 'Add to cart' : 'Out of stock'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
