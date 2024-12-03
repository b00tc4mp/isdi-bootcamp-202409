import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'

import { Calendar, DayLog, Home, Login, PartnerAccess, Register, Reports, Splash, Tips } from './view'
import { Header, Footer } from './view/components'

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
  const handleLogoClick = () => navigate('/')
  const handleUserLoggedOut = () => navigate('/login')
  const handleDayLogClick = () => navigate('/daylog')
  const handleCalendarClick = () => navigate('/calendar')
  const handleTipsClick = () => navigate('/tips')
  const handleReportsClick = () => navigate('/reports')

  if (showSplash) return <Splash />

  return <>
    <Header onLogoClick={handleLogoClick} onLoggedOut={handleUserLoggedOut} />

    <Routes>
      <Route path="/" element={logic.isUserLoggedIn() ? <Home /> : <Navigate to="/login" />} />

      <Route path="/login" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Login onLoggedIn={handleUserLoggedIn} onRegisterClick={handleRegisterClick} onPartnerAccessClick={handlePartnerAccessClick} />} />

      <Route path="/register" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Register onRegistered={handleUserRegistered} onLoginClick={handleLoginClick} onPartnerAccessClick={handlePartnerAccessClick} />} />

      <Route path="/partner" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <PartnerAccess onLoginClick={handleLoginClick} onRegisterClick={handleRegisterClick} />} />

      <Route path="/daylog" element={logic.isUserLoggedIn() ? <DayLog /> : <Navigate to="/login" />} />

      <Route path="/calendar" element={logic.isUserLoggedIn() ? <Calendar /> : <Navigate to="/login" />} />

      <Route path="/tips" element={logic.isUserLoggedIn() ? <Tips /> : <Navigate to="/login" />} />

      <Route path="/reports" element={logic.isUserLoggedIn() ? <Reports /> : <Navigate to="/login" />} />
    </Routes>

    <Footer onDayLogClick={handleDayLogClick} onCalendarClick={handleCalendarClick} onTipsClick={handleTipsClick} onReportsClick={handleReportsClick} />
  </>
}