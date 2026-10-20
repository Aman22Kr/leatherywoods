import React from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
import { StoreProvider } from './store'
import './index.css'
createRoot(document.getElementById('root')).render(<HashRouter><StoreProvider><App /></StoreProvider></HashRouter>)
