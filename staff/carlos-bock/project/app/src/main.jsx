import React from 'react'
import ReactDOM from 'react-dom/client'
import './style.css'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'


ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <App />
  </Router>
)
