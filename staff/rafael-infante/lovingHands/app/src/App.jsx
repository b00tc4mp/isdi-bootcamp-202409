import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import { Login, Home, Register, Welcome } from './view'
import { Header, Footer } from './view/components'

export default function App() {
  const navigate = useNavigate()

  const handleUserRegistered = () => navigate('/login')
  const handleUserLoggedIn = () => navigate('/home')
  const handleRegisterClick = () => navigate('/register')
  const handleLoginClick = () => navigate('/login')
  const handleUserLoggedOut = () => navigate('/')

  console.log('App -> render')
  return (
    <Routes>
      {/* <Welcome /> */}
      <Route
        path="/register"
        element={<Register onRegistered={handleUserRegistered} onLoginClick={handleLoginClick} />}
      />
      {/* <Header /> */}
      <Route path="/login" element={<Login onLoggedIn={handleUserLoggedIn} onRegisterClick={handleRegisterClick} />} />

      <Route path="/home" element={<Home onLoggedOut={handleUserLoggedOut} />} />

      <Route path="/" element={<Welcome onLoginClick={handleLoginClick} />} />
      {/* <Footer /> */}
    </Routes>
  )
}
