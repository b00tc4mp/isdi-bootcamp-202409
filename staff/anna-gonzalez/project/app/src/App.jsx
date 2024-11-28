import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'

import { Home, Login, PartnerAccess, Register, Splash } from './view'
import { Header } from './view/components'

import logic from './logic'

export default function App() {
  const navigate = useNavigate()

  const handleStarted = () => navigate('/login')

  const handleUserLoggedOut = () => navigate('/login')

  const handleUserLoggedIn = () => navigate('/home')
  const handleLoginClick = () => navigate('/login')

  const handleUserRegistered = () => navigate('/')
  const handleRegisterClick = () => navigate('/register')

  const handlePartnerAccessClick = () => navigate('/partner')

  return <>
    <Header onLoggedOut={handleUserLoggedOut} />

    <Routes>
      <Route path="/" element={<Splash onStarted={handleStarted} />} />

      <Route path="/home" element={logic.isUserLoggedIn() ? <Home /> : <Navigate to="/login" />} />

      <Route path="/login" element={logic.isUserLoggedIn() ? <Navigate to="/home" /> : <Login onLoggedIn={handleUserLoggedIn} onRegisterClick={handleRegisterClick} onPartnerAccessClick={handlePartnerAccessClick} />} />

      <Route path="/register" element={logic.isUserLoggedIn() ? <Navigate to="/home" /> : <Register onRegistered={handleUserRegistered} onLoginClick={handleLoginClick} onPartnerAccessClick={handlePartnerAccessClick} />} />

      <Route path="/partner" element={logic.isUserLoggedIn() ? <Navigate to="/home" /> : <PartnerAccess onLoginClick={handleLoginClick} onRegisterClick={handleRegisterClick} />} />
    </Routes>

  </>
}