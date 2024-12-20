import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import { Login, Home, Register, Welcome } from './view'
import logic from './logic'

export default function App() {
  const navigate = useNavigate()

  const handleUserRegistered = () => navigate('/login')
  const handleUserLoggedIn = () => navigate('/')
  const handleRegisterClick = () => navigate('/register')
  const handleLoginClick = () => navigate('/login')
  const handleUserLoggedOut = () => navigate('/')

  console.log('App -> render')
  return (
    <Routes>
      <Route path="/welcome" element={<Welcome onLoginClick={handleLoginClick} />} />

      <Route
        path="/register"
        element={<Register onRegistered={handleUserRegistered} onLoginClick={handleLoginClick} />}
      />

      <Route
        path="/login"
        element={
          logic.isUserLoggedIn() ? (
            <Home onLoggedOut={handleUserLoggedOut} />
          ) : (
            <Login onLoggedIn={handleUserLoggedIn} onRegisterClick={handleRegisterClick} />
          )
        }
      />

      <Route
        path="/"
        element={logic.isUserLoggedIn() ? <Home onLoggedOut={handleUserLoggedOut} /> : <Navigate to="/welcome" />}
      />
    </Routes>
  )
}
