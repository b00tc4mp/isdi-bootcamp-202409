import { useState } from 'react'

import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'

import { Login, Register, Home, Profile } from './view'

import { Header, Alert, Confirm } from './view/components'

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

  const handleUserLoggedOut = () => navigate('login')

  const handleUserLoggedIn = () => navigate('/')

  const handleRegisterClick = () => navigate('register')

  const handleLoginClick = () => navigate('login')

  const handleUserRegistered = () => navigate('login')

  const handleHomeClick = () => navigate('/')

  const handlProfileClick = () => navigate('profile')

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


  return < Context.Provider value={{
    alert(message, level = 'error') { setAlert({ message, level }) },
    confirm(message, callback, level = 'error') { setConfirm({ message, callback, level }) }
  }}>

    <Header
      onHomeClick={handleHomeClick}
      onLoggedOut={handleUserLoggedOut}
      onProfileClick={handleUserRegistered} />


    <Routes>

      {/* LOGIIIIN */}
      <Route path="/login" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Login onLoggedIn={handleUserLoggedIn} onRegisterClick={handleRegisterClick} />} />

      {/* REGISTEEER */}
      <Route path="/register" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Register onLoginClick={handleLoginClick} onRegistered={handleUserRegistered} />} />

      {/* HOMEEEE */}
      <Route path="/" element={logic.isUserLoggedIn() ? <Home /> : <Navigate to="/login" />} />

      {/* profile data (WIP) */}
      <Route path="/profile/:userId/*" element={<Profile />} />
    </Routes>

    {alert.message && <Alert message={alert.message} level={alert.level} onAccepted={handleAlertAccepted} />}

    // {confirm.message && <Confirm message={confirm.message} level={confirm.level} onAccepted={handleConfirmAccepted} onCancelled={handleConfirmCancelled} />}
  </Context.Provider>
}

