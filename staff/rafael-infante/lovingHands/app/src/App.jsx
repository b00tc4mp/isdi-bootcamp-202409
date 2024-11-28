import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import { Login, Home, Register, Welcome } from './view'
import { Header, Footer } from './view/components'

export default function App() {
  const navigate = useNavigate()

  const handleUserRegistered = () => navigate('/')
  const handleUserLoggedIn = () => navigate('/home')
  const handleRegisterClick = () => navigate('/register')
  const handleLoginClick = () => navigate('/')

  console.log('App -> render')
  return (
    <Routes>
      {/* <Welcome /> */}
      <Route
        path="/register"
        element={<Register onRegistered={handleUserRegistered} onLoginClick={handleLoginClick} />}
      />
      {/* <Header /> */}
      <Route path="/" element={<Login onLoggedIn={handleUserLoggedIn} onRegisterClick={handleRegisterClick} />} />

      <Route path="/home" element={<Home />} />

      {/* <Footer /> */}
    </Routes>
  )
}
