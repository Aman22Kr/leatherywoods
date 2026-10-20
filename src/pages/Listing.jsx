import { useParams, useSearchParams, useLocation, Link } from 'react-router-dom'
import { useMemo } from 'react'
import { Card, Ad } from '../components/ui'
import { categories, products } from '../data/catalog'
export default function Listing() {
  const { slug, group } = useParams(), { pathname } = useLocation(), [sp, setSp] = useSearchParams()
  const q = (sp.get('q') || '').toLowerCase().trim(), sort = sp.get('sort') || 'rel', mat = sp.get('mat') || '', stock = sp.get('stock') === '1', cat = sp.get('cat') || ''
  const base = useMemo(() => {
    if (slug) return products.filter(p => p.slug === slug)
    if (group) return products.filter(p => p.group === group)
    if (pathname === '/new-arrivals') return products.filter(p => p.isNew)
    return products.filter(p => !q || q.split(/\s+/).every(w => p.keywords.includes(w)))
  }, [slug, group, pathname, q])
  const list = useMemo(() => {
    let l = base.filter(p => (!mat || p.material === mat) && (!stock || p.inStock) && (!cat || p.slug === cat))
    const s = { low: (a, b) => a.price - b.price, high: (a, b) => b.price - a.price, rating: (a, b) => b.rating - a.rating, off: (a, b) => b.off - a.off }[sort]
    return s ? [...l].sort(s) : l
  }, [base, mat, stock, sort, cat])
  const set = (k, v) => { const n = new URLSearchParams(sp); v ? n.set(k, v) : n.delete(k); setSp(n, { replace: true }) }
  const title = slug ? categories.find(c => c.slug === slug)?.name : group ? group + ' Furniture' : pathname === '/new-arrivals' ? 'New Arrivals' : q ? `Results for “${sp.get('q')}”` : 'All Products'
  const mats = [...new Set(base.map(p => p.material))], cats = [...new Map(base.map(p => [p.slug, p.cat]))]
  return (<div><div className="max-w-site mx-auto px-4 py-6">
    <p className="text-xs text-gray-500"><Link to="/">Home</Link> / {title}</p>
    <div className="flex flex-wrap items-end justify-between gap-3 my-4"><h1 className="font-serif text-3xl">{title} <span className="text-sm text-gray-400 font-sans">({list.length} items)</span></h1>
      <div className="flex flex-wrap gap-2 text-sm">
        {!slug && cats.length > 1 && <select value={cat} onChange={e => set('cat', e.target.value)} className="border px-2 py-1.5"><option value="">All categories</option>{cats.map(([s, n]) => <option key={s} value={s}>{n}</option>)}</select>}
        <select value={mat} onChange={e => set('mat', e.target.value)} className="border px-2 py-1.5"><option value="">All materials</option>{mats.map(m => <option key={m}>{m}</option>)}</select>
        <label className="border px-2 py-1.5 flex items-center gap-1"><input type="checkbox" checked={stock} onChange={e => set('stock', e.target.checked ? '1' : '')} />In stock</label>
        <select value={sort} onChange={e => set('sort', e.target.value === 'rel' ? '' : e.target.value)} className="border px-2 py-1.5"><option value="rel">Relevance</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option><option value="rating">Top rated</option><option value="off">Biggest discount</option></select></div></div>
    {list.length ? <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">{list.map((p, i) => <Card key={p.id} p={p} i={i % 8} />)}</div>
      : <div className="text-center py-20"><p className="text-lg">No products match.</p><button className="btn-o mt-4" onClick={() => setSp(q ? { q: sp.get('q') } : {})}>Clear filters</button></div>}
  </div><Ad /></div>)
}
