import React from 'react'
import { createRoot } from 'react-dom/client'
import './original.css'
import './rebuild.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(<App />)
