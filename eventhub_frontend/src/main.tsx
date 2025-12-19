import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import { createStore } from './modules/store/store'
import App from './App'
import './index.css'

// const store = createStore({
//   dependencies: {}
// })

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <App />
  </StrictMode>,
)
