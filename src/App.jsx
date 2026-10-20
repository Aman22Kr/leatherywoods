import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Layout from './components/Layout'
import Home from './pages/Home'
import Listing from './pages/Listing'
import Product from './pages/Product'
import { Cart, Wishlist } from './pages/Cart'
import { Info, pages, NotFound } from './pages/Info'
function Top() { const { pathname } = useLocation(); useEffect(() => { window.scrollTo(0, 0) }, [pathname]); return null }
export default function App() {
  return (<Layout><Top /><Routes>
    <Route path="/" element={<Home />} />
    <Route path="/c/:slug" element={<Listing />} />
    <Route path="/g/:group" element={<Listing />} />
    <Route path="/search" element={<Listing />} />
    <Route path="/new-arrivals" element={<Listing />} />
    <Route path="/product/:id" element={<Product />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/wishlist" element={<Wishlist />} />
    {Object.keys(pages).map(k => <Route key={k} path={'/' + k} element={<Info page={k} />} />)}
    <Route path="*" element={<NotFound />} />
  </Routes></Layout>)
}
