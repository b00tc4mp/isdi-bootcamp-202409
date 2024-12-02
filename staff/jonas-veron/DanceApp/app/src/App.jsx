import { Routes, Route, useNavigate } from "react-router-dom"

import { Login, Register, Home, CreateEvent } from "./view/index.js"
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
        <Route path="/createEvent" element={<CreateEvent />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App
