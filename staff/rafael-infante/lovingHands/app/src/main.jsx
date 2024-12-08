import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles.css'
import 'leaflet/dist/leaflet.css'
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  //<StrictMode>
  <Router>
    <App />
  </Router>
  //</StrictMode>
)
