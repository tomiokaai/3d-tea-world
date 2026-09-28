import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import '@fontsource/fraunces/400-italic.css'
import '@fontsource/fraunces/500.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import './styles/tokens.css'
import './styles/global.css'
import './styles/journey.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
