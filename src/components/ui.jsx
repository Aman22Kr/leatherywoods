import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Heart, Star } from 'lucide-react'
import { MOTION } from '../config'
import { inr } from '../data/catalog'
import { useStore } from '../store'
export function Reveal({ children, i = 0, className = '' }) {
  const rm = useReducedMotion(), off = rm || MOTION.scale === 0
  if (off) return <div className={className}>{children}</div>
  return <motion.div className={className} initial={{ opacity: 0, y: MOTION.dist }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.5 * MOTION.scale, delay: Math.min(i, 6) * MOTION.stagger, ease: 'easeOut' }}>{children}</motion.div>
}
// Generated placeholder art (no third-party images, never broken). Swap for real photos via product.image.
export function Img({ tint = '#8a5a3c', label = '', ratio = '4/3', className = '' }) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='${tint}'/><stop offset='1' stop-color='#2b2118'/></linearGradient></defs><rect width='400' height='300' fill='url(#g)'/><rect x='70' y='150' width='260' height='70' rx='6' fill='rgba(255,255,255,.18)'/><rect x='90' y='215' width='14' height='40' fill='rgba(255,255,255,.25)'/><rect x='296' y='215' width='14' height='40' fill='rgba(255,255,255,.25)'/></svg>`
  return <div className={'relative overflow-hidden bg-cream ' + className} style={{ aspectRatio: ratio }}>
    <img loading="lazy" alt={label} className="w-full h-full object-cover transition duration-500 group-hover:scale-105" src={'data:image/svg+xml;utf8,' + encodeURIComponent(svg)} /></div>
}
export function Card({ p, i = 0 }) {
  const { wish, toggleWish } = useStore(), liked = wish.includes(p.id)
  return <Reveal i={i}><div className="group relative">
    <Link to={'/product/' + p.id}><Img tint={p.tint} label={p.name} ratio="4/3" />
      <div className="pt-3"><h3 className="text-sm font-medium truncate">{p.name}</h3>
        <p className="text-xs text-gray-500">{p.material} · {p.finish}</p>
        <p className="mt-1 text-sm"><b>{inr(p.price)}</b> <s className="text-gray-400 text-xs">{inr(p.mrp)}</s> <span className="text-accent text-xs">{p.off}% off</span></p>
        <p className="text-xs flex items-center gap-1 mt-1"><Star size={12} className="fill-amber-400 text-amber-400" />{p.rating} ({p.reviews}) {!p.inStock && <span className="ml-2 text-red-600">Out of stock</span>}</p></div></Link>
    <button aria-label="Save" onClick={() => toggleWish(p.id)} className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full shadow"><Heart size={16} className={liked ? 'fill-accent text-accent' : ''} /></button>
    {p.isNew && <span className="absolute top-2 left-2 bg-brand text-white text-[10px] px-2 py-0.5">NEW</span>}
  </div></Reveal>
}
export const Ad = () => <aside aria-label="Advertisement" className="max-w-site mx-auto my-6 px-4"><div className="h-20 border border-dashed border-gray-300 bg-gray-50 text-gray-400 text-xs flex items-center justify-center tracking-widest">ADVERTISEMENT · 728×90 PLACEHOLDER</div></aside>
