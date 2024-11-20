/*import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'*/
import React from 'react'
import ReactDOM from 'react-dom/client'
import './style.css'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  //<React.StrictMode>
  <Router>
    <App />
  </Router>
  //</React.StrictMode>,
)


/*NOTA: 
React.StrictMode es un contenedor especial de React que ayuda a identificar problemas potenciales en el código. Activa advertencias adicionales en el desarrollo y verifica prácticas recomendadas, pero no tiene efecto en producción.
*/