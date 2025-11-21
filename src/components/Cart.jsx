function Cart({ items, onClose }) {
  const total = items.reduce((sum, it) => sum + it.price * it.quantity, 0)

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/40" onClick={onClose} />
      <div className="w-full max-w-md h-full bg-white shadow-xl p-6 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Your cart</h3>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-800">Close</button>
        </div>
        {items.length === 0 ? (
          <p className="text-sm text-slate-500">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {items.map((it) => (
              <div key={it.id} className="flex items-start gap-3 border-b border-slate-200 pb-3">
                <img src={it.image} alt={it.title} className="h-16 w-16 rounded object-cover bg-slate-100" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-slate-800">{it.title}</h4>
                    <span className="text-sm font-semibold">${(it.price * it.quantity).toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-slate-500">${it.price} × {it.quantity}</p>
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between pt-2">
              <span className="font-semibold">Total</span>
              <span className="font-semibold">${total.toFixed(2)}</span>
            </div>
            <a href="#checkout" className="block w-full text-center rounded-lg bg-blue-600 text-white px-3 py-2 text-sm font-medium hover:bg-blue-700">Checkout</a>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
