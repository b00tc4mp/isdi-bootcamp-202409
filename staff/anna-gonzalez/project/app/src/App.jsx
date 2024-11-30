import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'

import { Home, Login, PartnerAccess, Register, Splash } from './view'
import { Header } from './view/components'

import logic from './logic'

export default function App() {
  const [showSplash, setShowSplash] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  const handleUserLoggedIn = () => navigate('/')
  const handleLoginClick = () => navigate('/login')
  const handleUserRegistered = () => navigate('/')
  const handleRegisterClick = () => navigate('/register')
  const handlePartnerAccessClick = () => navigate('/partner')
  const handleUserLoggedOut = () => navigate('/login')

  if (showSplash) return <Splash />

  return <>
    <Header onLoggedOut={handleUserLoggedOut} />

    <Routes>
      <Route path="/" element={logic.isUserLoggedIn() ? <Home /> : <Navigate to="/login" />} />

      <Route path="/login" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Login onLoggedIn={handleUserLoggedIn} onRegisterClick={handleRegisterClick} onPartnerAccessClick={handlePartnerAccessClick} />} />

      <Route path="/register" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Register onRegistered={handleUserRegistered} onLoginClick={handleLoginClick} onPartnerAccessClick={handlePartnerAccessClick} />} />

      <Route path="/partner" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <PartnerAccess onLoginClick={handleLoginClick} onRegisterClick={handleRegisterClick} />} />
    </Routes>

  </>
}