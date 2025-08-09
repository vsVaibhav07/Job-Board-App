import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ThemeProvider ,ThemeContext} from "./contexts/ThemeContext"
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <ThemeProvider>
     <App />
     </ThemeProvider>
   
  </StrictMode>,
)
