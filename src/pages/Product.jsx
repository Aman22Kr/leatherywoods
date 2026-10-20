import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Heart, Truck, ShieldCheck, Star } from 'lucide-react'
import { Img, Card, Reveal } from '../components/ui'
import { products, inr, reviews } from '../data/catalog'
import { useStore } from '../store'
import { NotFound } from './Info'
export default function Product() {
  const { id } = useParams(), p = products.find(x => x.id === id), { addCart, wish, toggleWish, seen } = useStore(), [added, setAdded] = useState(false)
  useEffect(() => { if (p) seen(p.id) }, [id]) // eslint-disable-line
  if (!p) return <NotFound />
  const rel = products.filter(x => x.slug === p.slug && x.id !== p.id).slice(0, 4)
  return (<div className="max-w-site mx-auto px-4 py-6">
    <p className="text-xs text-gray-500"><Link to="/">Home</Link> / <Link to={'/c/' + p.slug}>{p.cat}</Link> / {p.name}</p>
    <div className="grid md:grid-cols-2 gap-8 mt-4">
      <div className="grid grid-cols-4 gap-2"><Img tint={p.tint} ratio="4/3" className="col-span-4 group" label={p.name} />{[0, 1, 2, 3].map(i => <Img key={i} tint={i % 2 ? '#2b2118' : p.tint} ratio="1/1" label="" />)}</div>
      <Reveal><h1 className="font-serif text-3xl">{p.name}</h1>
        <p className="flex items-center gap-1 text-sm mt-1"><Star size={14} className="fill-amber-400 text-amber-400" />{p.rating} · {p.reviews} sample reviews</p>
        <p className="mt-4 text-2xl font-semibold">{inr(p.price)} <s className="text-base text-gray-400 font-normal">{inr(p.mrp)}</s> <span className="text-accent text-base">{p.off}% off</span></p>
        <p className="text-sm text-gray-600 mt-4">{p.desc}</p>
        <dl className="grid grid-cols-2 gap-y-1 text-sm mt-4 max-w-sm"><dt className="text-gray-500">Material</dt><dd>{p.material}</dd><dt className="text-gray-500">Finish</dt><dd>{p.finish}</dd><dt className="text-gray-500">Category</dt><dd>{p.cat}</dd><dt className="text-gray-500">Availability</dt><dd>{p.inStock ? 'In stock' : 'Out of stock'}</dd></dl>
        <div className="flex gap-3 mt-6"><button disabled={!p.inStock} className="btn disabled:opacity-40" onClick={() => { addCart(p.id); setAdded(true); setTimeout(() => setAdded(false), 1800) }}>{added ? 'Added ✓' : 'Add to cart'}</button>
          <button className="btn-o" onClick={() => toggleWish(p.id)}><Heart size={16} className={wish.includes(p.id) ? 'fill-accent text-accent' : ''} />{wish.includes(p.id) ? 'Saved' : 'Save'}</button></div>
        <ul className="mt-6 text-sm space-y-2 text-gray-600"><li className="flex gap-2"><Truck size={16} />Sample delivery info for demo</li><li className="flex gap-2"><ShieldCheck size={16} />Sample warranty text for demo</li></ul></Reveal></div>
    <h2 className="font-serif text-2xl mt-12 mb-4">Reviews (sample data)</h2><div className="grid md:grid-cols-3 gap-4">{reviews.map(([n, t]) => <blockquote key={n} className="border p-4 text-sm"><p className="text-gray-600">{t}</p><footer className="mt-2 font-medium">{n}</footer></blockquote>)}</div>
    <h2 className="font-serif text-2xl mt-12 mb-4">You may also like</h2><div className="grid grid-cols-2 md:grid-cols-4 gap-5">{rel.map((r, i) => <Card key={r.id} p={r} i={i} />)}</div></div>)
}
