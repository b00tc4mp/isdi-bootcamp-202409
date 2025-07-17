import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import 'preline/preline'

ReactDOM.createRoot(document.getElementById('root')).render(
    <Router>
        <App />
    </Router>
)