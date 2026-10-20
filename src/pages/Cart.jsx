import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { Img, Card, Ad } from '../components/ui'
import { products, inr } from '../data/catalog'
import { useStore } from '../store'
export function Cart() {
  const { cart, setQty, clearCart } = useStore(), [done, setDone] = useState(false)
  const rows = cart.map(c => ({ ...c, p: products.find(p => p.id === c.id) })).filter(r => r.p)
  const total = rows.reduce((a, r) => a + r.p.price * r.qty, 0)
  if (done) return <div className="max-w-xl mx-auto py-20 px-4 text-center"><h1 className="font-serif text-3xl">Demo checkout complete</h1><p className="text-gray-600 mt-3">No order was placed, no payment was taken and nothing was sent to a server. This is a front-end demo.</p><Link to="/" className="btn mt-6">Back to home</Link></div>
  return (<div className="max-w-site mx-auto px-4 py-8"><h1 className="font-serif text-3xl mb-6">Your Cart</h1>
    {!rows.length ? <div className="py-16 text-center"><p>Your cart is empty.</p><Link to="/new-arrivals" className="btn mt-4">Browse new arrivals</Link></div> :
      <div className="grid lg:grid-cols-3 gap-8"><div className="lg:col-span-2 divide-y">{rows.map(({ p, qty }) => <div key={p.id} className="flex gap-4 py-4"><div className="w-28"><Img tint={p.tint} label={p.name} /></div>
        <div className="flex-1"><Link to={'/product/' + p.id} className="font-medium">{p.name}</Link><p className="text-xs text-gray-500">{p.material} · {p.finish}</p><p className="text-sm mt-1">{inr(p.price)}</p>
          <div className="flex items-center gap-2 mt-2 text-sm"><button className="border w-7 h-7" onClick={() => setQty(p.id, qty - 1)}>−</button>{qty}<button className="border w-7 h-7" onClick={() => setQty(p.id, qty + 1)}>+</button><button aria-label="Remove" className="ml-3 text-gray-400" onClick={() => setQty(p.id, 0)}><Trash2 size={16} /></button></div></div></div>)}</div>
        <aside className="border p-5 h-fit"><h2 className="font-medium">Summary</h2><p className="flex justify-between my-3"><span>Total</span><b>{inr(total)}</b></p><button className="btn w-full" onClick={() => { clearCart(); setDone(true) }}>Place demo order</button><p className="text-xs text-gray-400 mt-3">Demo only. Cart is stored in this browser (localStorage) and does not sync across devices.</p></aside></div>}<Ad /></div>)
}
export function Wishlist() {
  const { wish } = useStore(), items = wish.map(id => products.find(p => p.id === id)).filter(Boolean)
  return (<div className="max-w-site mx-auto px-4 py-8"><h1 className="font-serif text-3xl mb-6">Wishlist ({items.length})</h1>
    {items.length ? <div className="grid grid-cols-2 md:grid-cols-4 gap-5">{items.map((p, i) => <Card key={p.id} p={p} i={i} />)}</div> : <p className="py-16 text-center text-gray-500">Nothing saved yet. Tap the heart on any product.</p>}<Ad /></div>)
}
