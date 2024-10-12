import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import App from './App.tsx'
import './index.css'
import HungApp from './HungApp.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HungApp />
  </StrictMode>,
)
