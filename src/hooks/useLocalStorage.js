import { useEffect, useState } from 'react'
import { STORAGE_PREFIX } from '../config'
export function useLocalStorage(key, initial, valid = () => true) {
  const k = STORAGE_PREFIX + key
  const [v, setV] = useState(() => {
    try { const raw = localStorage.getItem(k); if (raw == null) return initial; const p = JSON.parse(raw); return valid(p) ? p : initial }
    catch { return initial }
  })
  useEffect(() => { try { localStorage.setItem(k, JSON.stringify(v)) } catch { /* blocked or full */ } }, [k, v])
  return [v, setV]
}
