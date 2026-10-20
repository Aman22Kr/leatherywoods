import { createContext, useContext } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'
const Ctx = createContext(null)
export const useStore = () => useContext(Ctx)
const arr = Array.isArray
export function StoreProvider({ children }) {
  const [cart, setCart] = useLocalStorage('cart', [], arr)
  const [wish, setWish] = useLocalStorage('wishlist', [], arr)
  const [recent, setRecent] = useLocalStorage('recent', [], arr)
  const [history, setHistory] = useLocalStorage('searches', [], arr)
  const addCart = id => setCart(c => c.some(x => x.id === id) ? c.map(x => x.id === id ? { ...x, qty: x.qty + 1 } : x) : [...c, { id, qty: 1 }])
  const setQty = (id, q) => setCart(c => q < 1 ? c.filter(x => x.id !== id) : c.map(x => x.id === id ? { ...x, qty: q } : x))
  const toggleWish = id => setWish(w => w.includes(id) ? w.filter(x => x !== id) : [...w, id])
  const seen = id => setRecent(r => [id, ...r.filter(x => x !== id)].slice(0, 8))
  const remember = q => q && setHistory(h => [q, ...h.filter(x => x !== q)].slice(0, 6))
  return <Ctx.Provider value={{ cart, addCart, setQty, clearCart: () => setCart([]), wish, toggleWish, recent, seen, history, remember }}>{children}</Ctx.Provider>
}
