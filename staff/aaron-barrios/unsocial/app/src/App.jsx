import { useState } from 'react'

import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'

import { Login, Register, Home, CreatePost } from './view'

import { Header, Footer, ProfileData, Alert, Confirm } from './view/components'

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

  const handlePostCreated = () => navigate('/')

  const handleUserLoggedOut = () => navigate('login')

  const handleUserLoggedIn = () => navigate('/')

  const handleRegisterClick = () => navigate('register')

  const handleLoginClick = () => navigate('login')

  const handleUserRegistered = () => navigate('login')

  const handleNewPostClick = () => navigate('new-post')

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

      {/* CREATEEEE POST  */}
      <Route path="/new-post" element={logic.isUserLoggedIn() ? <CreatePost onCreated={handlePostCreated} /> : <Navigate to="/login" />} />

      {/* profile data (WIP) */}
      <Route path="/profile" element={logic.isUserLoggedIn() ? <ProfileData
        home={handleHomeClick}
        onProfile={handlProfileClick} />
        : <Navigate to="/login" />}
      />

    </Routes>

    <Footer onNewPostClick={handleNewPostClick} />

    {alert.message && <Alert message={alert.message} level={alert.level} onAccepted={handleAlertAccepted} />}

    // {confirm.message && <Confirm message={confirm.message} level={confirm.level} onAccepted={handleConfirmAccepted} onCancelled={handleConfirmCancelled} />}
  </Context.Provider>
}

