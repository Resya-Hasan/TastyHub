import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider as ReduxProvider } from 'react-redux'
import App from './App.jsx'
import store from './store/index.js'

createRoot(document.getElementById('root')).render(
  <ReduxProvider store={store}>
    {/* <StrictMode> */}
      <App />
    {/* </StrictMode> */}
  </ReduxProvider>
)
