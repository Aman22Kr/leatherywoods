import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Reveal, Img, Card } from '../components/ui'
import { categories, groups, products, reviews } from '../data/catalog'
import { BRAND } from '../config'
import { useStore } from '../store'
const slides = [['Festive Sale: up to 70% off', 'sofas', '#6b4f3a'], ['Beds made to last', 'beds', '#7b5238'], ['Dining, together', 'dining-sets', '#7a4f33'], ['Sofa cum beds that work double time', 'sofa-cum-beds', '#5a4a42']]
export default function Home() {
  const [s, setS] = useState(0), { recent } = useStore()
  useEffect(() => { const t = setInterval(() => setS(x => (x + 1) % slides.length), 5000); return () => clearInterval(t) }, [])
  const seen = recent.map(id => products.find(p => p.id === id)).filter(Boolean)
  return (<div>
    <section className="relative"><Link to={'/c/' + slides[s][1]}><Img tint={slides[s][2]} ratio="21/8" className="!aspect-[16/9] md:!aspect-[21/8]" label={slides[s][0]} />
      <div className="absolute inset-0 flex items-center"><div className="max-w-site mx-auto px-6 w-full"><h1 className="font-serif text-3xl md:text-6xl text-white max-w-xl drop-shadow">{slides[s][0]}</h1><span className="btn mt-5">Shop now</span></div></div></Link>
      <button aria-label="Previous" onClick={() => setS((s + slides.length - 1) % slides.length)} className="absolute left-3 top-1/2 bg-white/80 p-2 rounded-full"><ChevronLeft /></button>
      <button aria-label="Next" onClick={() => setS((s + 1) % slides.length)} className="absolute right-3 top-1/2 bg-white/80 p-2 rounded-full"><ChevronRight /></button></section>
    <section className="max-w-site mx-auto px-4 py-10"><h2 className="font-serif text-2xl mb-5">Explore Our Exclusive Deals</h2>
      <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-4">{categories.slice(0, 9).map((c, i) => <Reveal key={c.slug} i={i}><Link to={'/c/' + c.slug} className="group block text-center"><Img tint={c.tint} ratio="1/1" className="rounded-full" label={c.name} /><span className="text-xs mt-2 block">{c.name}</span></Link></Reveal>)}</div></section>
    <section className="bg-cream"><div className="max-w-site mx-auto px-4 py-12 grid md:grid-cols-2 gap-8 items-center"><Img tint="#435471" ratio="16/10" label="Experience stores" />
      <Reveal><p className="text-accent text-sm tracking-widest">{BRAND.toUpperCase()}</p><h2 className="font-serif text-4xl my-3">Experience stores</h2><p className="text-gray-600 mb-5">See designs up close, feel the materials, and talk to our design team. (Sample copy for this demo.)</p><Link to="/stores" className="btn">Find your nearest store</Link></Reveal></div></section>
    <section className="max-w-site mx-auto px-4 py-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">{groups.slice(0, 4).map((g, i) => <Reveal key={g} i={i}><Link to={'/g/' + g} className="group block relative"><Img tint={categories.find(c => c.group === g).tint} ratio="4/5" label={g} /><div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/70 text-white"><h3 className="font-serif text-xl">{g} Room</h3><span className="text-xs underline">Shop now</span></div></Link></Reveal>)}</section>
    <section className="max-w-site mx-auto px-4 py-6"><h2 className="font-serif text-2xl mb-5">Your Most-Loved Picks</h2><div className="grid grid-cols-2 md:grid-cols-4 gap-5">{products.filter(p => +p.rating >= 4.7).slice(0, 8).map((p, i) => <Card key={p.id} p={p} i={i} />)}</div></section>
    {seen.length > 0 && <section className="max-w-site mx-auto px-4 py-6"><h2 className="font-serif text-2xl mb-5">Recently Viewed</h2><div className="grid grid-cols-2 md:grid-cols-4 gap-5">{seen.slice(0, 4).map((p, i) => <Card key={p.id} p={p} i={i} />)}</div></section>}
    <section className="max-w-site mx-auto px-4 py-10"><h2 className="font-serif text-2xl mb-1">Their Words, Our Pride</h2><p className="text-xs text-gray-400 mb-5">Sample reviews for demonstration</p>
      <div className="grid md:grid-cols-3 gap-5">{reviews.map(([n, t], i) => <Reveal key={n} i={i}><blockquote className="border p-5 h-full"><p className="text-sm text-gray-600">{t}</p><footer className="mt-3 text-sm font-medium">{n}</footer></blockquote></Reveal>)}</div>
      <Link to="/customer-stories" className="btn-o mt-6">View all</Link></section>
  </div>)
}
