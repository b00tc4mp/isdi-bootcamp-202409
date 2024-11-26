import { Routes, Route, useNavigate, Navigate } from "react-router-dom"

import { Login, Register, Home } from "./view/index.js"
import { Header, Footer } from "./view/Components/index.js"

function App() {
  return (
    <>
      {/* <h1>Hola mundo !</h1> */}
      <Header />
      <Login></Login>

      <Footer />
    </>
  )
}

export default App
