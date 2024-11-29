import { Routes, Route, useNavigate, Navigate } from "react-router-dom"

import { Login, Register, Home } from "./view/index.js"
import { Header, Footer } from "./view/Components/index.js"

function App() {
  const navigate = useNavigate()
  // const handleUserLoggedIn = () => navigate("/")

  //Login Handles
  const handleUserLoggedIn = () => navigate("/")
  const handleRegisterClick = () => navigate("/register")

  //Register Handles
  const handleUserRegistered = () => navigate("/login")
  const handleLoginClick = () => navigate("/login")

  console.log("App -> render")

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/login"
          element={
            <Login
              onLoggedIn={handleUserLoggedIn}
              onRegisterClick={handleRegisterClick}
            />
          }
        />
        <Route
          path="/register"
          element={
            <Register
              onRegistered={handleUserRegistered}
              onLoginClick={handleLoginClick}
            />
          }
        />

        <Route path="/" element={<Home />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App
