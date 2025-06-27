import { useState } from 'react'

import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'

import { Login, Register, Home, CreatePost } from './view'

import Hello from './view/Hello'
import Search from './view/Search'
import { Header, Footer, Alert } from './components/functional'


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

  const handleHomeclick = () => navigate('/')

  const handleLoggedOut = () => navigate('/login')

  const handleLoggedIn = () => navigate("/")

  const handleRegister = () => navigate("/register")

  const handleLogBack = () => navigate("/login")

  const handleUserRegistered = () => navigate('/login')

  const handlePostCreated = () => navigate('/')

  const handleOnCanceled = () => navigate('/')

  const handleNewPostClick = () => navigate('/new-post')

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

  console.log('App -> render')

  return < Context.Provider value={{
    alert(message, level = 'error') { setAlert({ message, level }) },
    confirm(message, callback, level = 'error') { setConfirm({ message, callback, level }) }
  }}>

    <Header onHomeClick={handleHomeclick} onLoggedOut={handleLoggedOut} />

    <Routes>
      <Route path="/login" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Login onLoggedIn={handleLoggedIn} registerInquire={handleRegister} />} />

      <Route path="/register" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Register logBack={handleLogBack} onRegistered={handleUserRegistered} />} />

      <Route path="/" element={logic.isUserLoggedIn() ? <Home /> : < Navigate to="/login" />} />

      <Route path="/new-post" element={logic.isUserLoggedIn() ? <CreatePost onCreated={handlePostCreated} OnCancel={handleOnCanceled} /> : <Navigate to="/login" />} />

      {/* Demos search & hello user */}
      <Route path="/hello/:name" element={<Hello />} />
      <Route path="/search" element={<Search />} />

    </Routes>

    <Footer onNewPostClick={handleNewPostClick} />

    {alert.message && <Alert message={alert.message} level={alert.level} onAccepted={handleAlertAccepted} />}

    {confirm.message && <Confirm message={alert.message} level={confirm.level} onAccepted={handleConfirmAccepted} OnCancelled={handleConfirmCancelled} />}


  </Context.Provider>
}


