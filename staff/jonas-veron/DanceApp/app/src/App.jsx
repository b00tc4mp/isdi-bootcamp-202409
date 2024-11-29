import { Routes, Route, useNavigate } from "react-router-dom"

import { Login, Register, Home } from "./view/index.js"
import { Header, Footer } from "./view/Components/functional/index.js"

function App() {
  const navigate = useNavigate()

  console.log("App -> render")

  return (
    <>
      <Header />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App
