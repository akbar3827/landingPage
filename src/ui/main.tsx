import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import '../index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  // <StrictMode> -> pembungkus react khusus buat mengecek error & warning (letaknya direact)
  // kegunaan dari browserRouter yaitu untuk memanage keseluruhan routing dari keseluruhan dari aplikasi kita
  <StrictMode> 
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </StrictMode>,
)
