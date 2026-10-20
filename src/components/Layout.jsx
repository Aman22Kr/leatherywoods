import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Search, Heart, ShoppingCart, Menu, X, Phone } from 'lucide-react'
import { BRAND } from '../config'
import { categories, groups } from '../data/catalog'
import { useStore } from '../store'
import { Ad } from './ui'
export default function Layout({ children }) {
  const { cart, wish, history, remember } = useStore(), nav = useNavigate()
  const [q, setQ] = useState(''), [open, setOpen] = useState(false), [focus, setFocus] = useState(false)
  const go = (v = q) => { if (!v.trim()) return; remember(v.trim()); nav('/search?q=' + encodeURIComponent(v.trim())); setFocus(false); setOpen(false) }
  const count = cart.reduce((a, c) => a + c.qty, 0)
  return (<div className="min-h-screen flex flex-col">
    <div className="bg-brand text-white text-xs"><div className="max-w-site mx-auto px-4 py-1.5 flex justify-between"><span className="flex items-center gap-1"><Phone size={12} />+91-00000-00000 (demo)</span>
      <span className="hidden sm:flex gap-4"><Link to="/franchise">Become a Franchise</Link><Link to="/track-order">Track Order</Link><Link to="/help-center">Help Center</Link></span></div></div>
    <header className="sticky top-0 z-40 bg-white border-b shadow-sm">
      <div className="max-w-site mx-auto px-4 py-3 flex items-center gap-4">
        <button className="lg:hidden" aria-label="Menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
        <Link to="/" className="font-serif text-2xl font-bold text-brand tracking-tight">{BRAND}</Link>
        <div className="relative flex-1 max-w-xl mx-auto">
          <input value={q} onChange={e => setQ(e.target.value)} onFocus={() => setFocus(true)} onKeyDown={e => e.key === 'Enter' && go()} placeholder="Search for sofas, beds, tables…" className="w-full border px-4 py-2 pr-10 text-sm outline-none focus:border-brand" />
          <button aria-label="Search" onClick={() => go()} className="absolute right-3 top-2.5 text-gray-500"><Search size={18} /></button>
          {focus && history.length > 0 && <div className="absolute top-full inset-x-0 bg-white border shadow z-50 text-sm" onMouseLeave={() => setFocus(false)}>
            <p className="px-4 pt-2 text-xs text-gray-400">Recent searches</p>{history.map(h => <button key={h} onClick={() => go(h)} className="block w-full text-left px-4 py-1.5 hover:bg-cream">{h}</button>)}</div>}
        </div>
        <Link to="/wishlist" className="relative" aria-label="Wishlist"><Heart />{wish.length > 0 && <b className="absolute -top-2 -right-2 bg-accent text-white text-[10px] rounded-full w-4 h-4 grid place-items-center">{wish.length}</b>}</Link>
        <Link to="/cart" className="relative" aria-label="Cart"><ShoppingCart />{count > 0 && <b className="absolute -top-2 -right-2 bg-accent text-white text-[10px] rounded-full w-4 h-4 grid place-items-center">{count}</b>}</Link>
      </div>
      <nav className={(open ? 'block' : 'hidden') + ' lg:block border-t bg-white'}>
        <ul className="max-w-site mx-auto px-4 flex flex-col lg:flex-row lg:gap-7 text-sm font-medium">
          {groups.map(g => <li key={g} className="group/n relative py-2 lg:py-3">
            <Link to={'/g/' + g} onClick={() => setOpen(false)} className="hover:text-accent">{g}</Link>
            <ul className="hidden group-hover/n:block lg:absolute left-0 top-full bg-white border shadow-lg min-w-52 py-2 z-50 font-normal">
              {categories.filter(c => c.group === g).map(c => <li key={c.slug}><Link to={'/c/' + c.slug} onClick={() => setOpen(false)} className="block px-4 py-1.5 hover:bg-cream hover:text-accent">{c.name}</Link></li>)}</ul></li>)}
          <li className="py-2 lg:py-3"><Link to="/new-arrivals" className="text-accent">New Arrivals</Link></li>
        </ul></nav>
    </header>
    <main className="flex-1">{children}</main>
    <Ad />
    <footer className="bg-ink text-gray-300 text-sm"><div className="max-w-site mx-auto px-4 py-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {[['Our Company', [['about','About Us'],['stores','Our Stores'],['customer-stories','Customer Stories'],['careers','Careers']]],
        ['Useful Links', [['custom-furniture','Custom Furniture'],['hotel-furniture','Hotel Furniture'],['franchise','Become a Franchise']]],
        ['Need Help', [['help-center','Help Center'],['contact','Contact Us'],['track-order','Track your order'],['faq','FAQ']]]].map(([t, l]) =>
        <div key={t}><h4 className="text-white font-medium mb-3">{t}</h4>{l.map(([to, n]) => <Link key={to} to={'/' + to} className="block py-1 hover:text-white">{n}</Link>)}</div>)}
      <div><h4 className="text-white font-medium mb-3">Shop By Room</h4>{groups.slice(0, 5).map(g => <Link key={g} to={'/g/' + g} className="block py-1 hover:text-white">{g}</Link>)}</div>
    </div>
    <div className="border-t border-white/10 text-center text-xs py-4 px-4">© 2026 {BRAND}. Demo storefront with sample data — no real orders or payments. <Link to="/terms" className="underline ml-2">Terms</Link> <Link to="/privacy" className="underline ml-2">Privacy</Link></div></footer>
  </div>)
}
