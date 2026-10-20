import { Link } from 'react-router-dom'
import { useState } from 'react'
import { BRAND } from '../config'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { Ad } from '../components/ui'
const lorem = `This is placeholder copy written for the ${BRAND} demo site. Replace it with your own content.`
export const pages = {
  about: ['About Us', `${BRAND} is a fictional furniture brand used for this front-end demo. ${lorem}`],
  stores: ['Our Stores', `Sample store directory. ${lorem}`],
  'customer-stories': ['Customer Stories', `Sample customer stories. ${lorem}`],
  careers: ['Careers', lorem], franchise: ['Become a Franchise', lorem], 'custom-furniture': ['Custom Furniture', lorem], 'hotel-furniture': ['Hotel Furniture', lorem],
  'help-center': ['Help Center', lorem], 'track-order': ['Track your order', 'Order tracking is not available in this demo: there is no backend and no real orders exist.'],
  terms: ['Terms of Use', lorem], privacy: ['Security & Privacy', 'This demo stores cart, wishlist, recent items, search history and form drafts only in your own browser (localStorage). It does not sync across devices and is not an account. Never enter real personal or payment details.'],
  contact: ['Contact Us', ''], faq: ['FAQ', '']
}
const faqs = [['Is this a real store?', 'No. It is a demo with sample products; nothing can be purchased.'], ['Where is my cart saved?', 'In this browser only (localStorage). It does not follow you to another device.'], ['Do you take payments?', 'No payment is ever processed.']]
export function Info({ page }) {
  const [title, body] = pages[page], [d, setD] = useLocalStorage('contact-draft', { name: '', email: '', msg: '' }, v => v && typeof v === 'object'), [ok, setOk] = useState(false)
  return (<div><div className="max-w-3xl mx-auto px-4 py-12"><h1 className="font-serif text-4xl mb-5">{title}</h1>
    {body && <p className="text-gray-600 leading-relaxed">{body}</p>}
    {page === 'faq' && faqs.map(([q, a]) => <details key={q} className="border-b py-3"><summary className="cursor-pointer font-medium">{q}</summary><p className="text-gray-600 mt-2 text-sm">{a}</p></details>)}
    {page === 'contact' && (ok ? <p className="p-4 bg-cream">Thanks! Nothing was sent: this demo has no server. Your draft is only saved in this browser.</p> :
      <form onSubmit={e => { e.preventDefault(); setOk(true); setD({ name: '', email: '', msg: '' }) }} className="space-y-3">
        {[['name', 'Name', 'text'], ['email', 'Email', 'email']].map(([k, l, t]) => <input key={k} required type={t} placeholder={l} value={d[k] || ''} onChange={e => setD({ ...d, [k]: e.target.value })} className="w-full border px-3 py-2" />)}
        <textarea required rows="4" placeholder="Message" value={d.msg || ''} onChange={e => setD({ ...d, msg: e.target.value })} className="w-full border px-3 py-2" /><button className="btn">Send (demo)</button></form>)}</div><Ad /></div>)
}
export const NotFound = () => <div className="text-center py-24 px-4"><h1 className="font-serif text-6xl">404</h1><p className="my-4 text-gray-600">We couldn’t find that page.</p><Link to="/" className="btn">Go home</Link></div>
