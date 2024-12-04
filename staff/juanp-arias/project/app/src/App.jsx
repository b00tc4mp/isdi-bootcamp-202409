import { useState } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import { Login, Register, WelcomeScreen, Home, Profile, Calendar, Notes, Alerts } from './view'
import { Header, Footer, Alert, Confirm } from './view/components'
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

  const navigate = useNavigate()

  const handleStartedClick = () => navigate('/register')

  const handleUserLoggedIn = () => navigate('/home')

  const handleGoBackClick = () => navigate('/welcome')

  const handleLoginClick = () => navigate('/login')

  const handleUserRegistered = () => navigate('/home')

  const handleLogout = () => navigate('/welcome')

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
  return <Context.Provider value={{
    alert(message, level = 'error') { setAlert({ message, level }) },
    confirm(message, callback, level = 'error') { setConfirm({ message, callback, level }) }
  }}>
    {logic.isUserLoggedIn() && <Header onLoggedOut={handleLogout} />}
    <Routes>
      <Route path="/welcome" element={logic.isUserLoggedIn() ? <Home /> : <WelcomeScreen onStartedClick={handleStartedClick} onLoginClick={handleLoginClick} />} />

      <Route path="/login" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Login onLoggedIn={handleUserLoggedIn} onBackClick={handleGoBackClick} />} />

      <Route path="/register" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Register onLoginClick={handleLoginClick} onRegistered={handleUserRegistered} onBackClick={handleGoBackClick} />} />

      <Route path="/home" element={logic.isUserLoggedIn() ? <Home /> : <Navigate to="/welcome" />} />

      <Route path="/" element={logic.isUserLoggedIn() ? <Home /> : <Navigate to="/welcome" />} />

      <Route path="/profile" element={logic.isUserLoggedIn() ? <Profile /> : <Navigate to="/welcome" />} />

      <Route path="/calendar" element={logic.isUserLoggedIn() ? <Calendar /> : <Navigate to="/welcome" />} />

      <Route path="/notes" element={logic.isUserLoggedIn() ? <Notes /> : <Navigate to="/welcome" />} />

      <Route path="/alerts" element={logic.isUserLoggedIn() ? <Alerts /> : <Navigate to="/welcome" />} />

    </Routes>
    {logic.isUserLoggedIn() && <Footer />}

    {alert.message && <Alert message={alert.message} level={alert.level} onAccepted={handleAlertAccepted} />}

    {confirm.message && <Confirm message={confirm.message} level={confirm.level} onAccepted={handleConfirmAccepted} onCancelled={handleConfirmCancelled} />}
  </Context.Provider>
}

