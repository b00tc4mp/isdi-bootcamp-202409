import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./styles.css"
import { BrowserRouter as Router } from "react-router-dom"
import "./styles.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <App />
  </Router>
)
