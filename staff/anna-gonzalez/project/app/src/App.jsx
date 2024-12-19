import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'

import { Calendar, DayLog, Home, Login, Register, Reports, Tips } from './view'
import { Alert, Confirm, Header, Footer, Reminder, Splash } from './view/components'

import { Context } from './view/useContext'
import logic from './logic'

export default function App() {
  const [alert, setAlert] = useState({
    message: null,
    level: 'error'
  })

  const [confirm, setConfirm] = useState({
    message: null,
    level: 'error',
    callback: null
  })

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
  const handleLogoClick = () => navigate('/')
  const handleUserLoggedOut = () => navigate('/login')
  const handleCalendarClick = () => navigate('/calendar')
  const handleTipsClick = () => navigate('/tips')
  const handleReportsClick = () => navigate('/reports')
  const handleDayLogCreated = () => navigate('/')
  const handleReminderCreated = () => navigate('/')

  const handleAlertAccepted = () => setAlert({
    message: null,
    level: 'error'
  })

  const handleConfirmAccepted = () => {
    confirm.callback(true)

    setConfirm({
      message: null,
      level: 'error',
      callback: null
    })
  }

  const handleConfirmCancelled = () => {
    confirm.callback(false)

    setConfirm({
      message: null,
      level: 'error',
      callback: null
    })
  }

  if (showSplash) return <Splash />

  return <Context.Provider value={{
    alert(message, level = 'error') { setAlert({ message, level }) },
    confirm(message, callback, level = 'error') { setConfirm({ message, callback, level }) }
  }}>
    <Header onLogoClick={handleLogoClick} onLoggedOut={handleUserLoggedOut} />

    <Routes>
      <Route path="/" element={logic.isUserLoggedIn() ? <Home /> : <Navigate to="/login" />} />

      <Route path="/login" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Login onLoggedIn={handleUserLoggedIn} onRegisterClick={handleRegisterClick} />} />

      <Route path="/register" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Register onRegistered={handleUserRegistered} onLoginClick={handleLoginClick} />} />

      <Route path="/daylog/:formattedDate" element={logic.isUserLoggedIn() ? <DayLog onCreated={handleDayLogCreated} /> : <Navigate to="/login" />} />

      <Route path="/reminder/:formattedDate" element={logic.isUserLoggedIn() ? <Reminder onCreated={handleReminderCreated} /> : <Navigate to="/login" />} />

      <Route path="/calendar" element={logic.isUserLoggedIn() ? <Calendar /> : <Navigate to="/login" />} />

      <Route path="/tips" element={logic.isUserLoggedIn() ? <Tips /> : <Navigate to="/login" />} />

      <Route path="/reports" element={logic.isUserLoggedIn() ? <Reports /> : <Navigate to="/login" />} />
    </Routes>

    <Footer onHomeClick={handleLogoClick} onCalendarClick={handleCalendarClick} onTipsClick={handleTipsClick} onReportsClick={handleReportsClick} />

    {alert.message && <Alert message={alert.message} level={alert.level} onAccepted={handleAlertAccepted} />}

    {confirm.message && <Confirm message={confirm.message} level={confirm.level} onAccepted={handleConfirmAccepted} onCancelled={handleConfirmCancelled} />}
  </Context.Provider>
}