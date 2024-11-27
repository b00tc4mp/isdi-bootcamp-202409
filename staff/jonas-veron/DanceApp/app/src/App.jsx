import { Routes, Route, useNavigate, Navigate } from "react-router-dom"

import { Login, Register, Home } from "./view/index.js"
import { Header, Footer } from "./view/Components/index.js"

function App() {
  const navigate = useNavigate()
  const handleUserLoggedIn = () => navigate("/")

  return (
    <>
      <Header />
      <Login />
      {/* <Register /> */}
      {/* <Home /> */}

      <Footer />
    </>
  )
}

export default App
