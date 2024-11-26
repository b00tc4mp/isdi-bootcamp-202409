import { useState } from 'react'

import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'

import { Login, Register, Home, CreatePost, ProfileUser } from './view'

import Hello from './view/Hello'
import Search from './view/Search'
import Profile from './view/Profile'

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

  const handlePostCreated = () => navigate('/')

  const handleUserLoggedOut = () => navigate('/login')

  const handleUserLoggedIn = () => navigate('/')

  const handleRegisterClick = () => navigate('/register')

  const handleLoginClick = () => navigate('/login')

  const handleUserRegirtered = () => navigate('/login')

  const handleNewPostClick = () => navigate('/new-post')

  const handleHomeClick = () => navigate('/')

  const handleProfileClick = () => navigate('/profile')

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

  return <Context.Provider value={{
    alert(message, level = 'error') { setAlert({ message, level }) },
    confirm(message, callback, level = 'error') { setConfirm({ message, callback, level }) }
  }}>
    <Header onHomeClick={handleHomeClick} onLoggedOut={handleUserLoggedOut} onProfile={handleProfileClick} />

    <Routes>
      <Route path="/login" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Login onLoggedIn={handleUserLoggedIn} onRegisterClick={handleRegisterClick} />} />

      <Route path="/register" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Register onRegisterIn={handleUserRegirtered} onLoginClick={handleLoginClick} />} />

      <Route path="/" element={logic.isUserLoggedIn() ? <Home /> : <Navigate to="/login" />} />

      <Route path="/new-post" element={logic.isUserLoggedIn() ? <CreatePost onCreated={handlePostCreated} /> : <Navigate to="/login" />} />

      {/* extra demos */}
      <Route path="/hello/:name" element={<Hello />} />
      <Route path="/search" element={<Search />} />
      <Route path="/profile/:userId/*" element={<Profile />} />
    </Routes>

    <Footer onNewPostClick={handleNewPostClick} />

    {alert.message && <Alert message={alert.message} level={alert.level} onAccepted={handleAlertAccepted} />}

    {confirm.message && <Confirm message={confirm.message} level={confirm.level} onAccepted={handleConfirmAccepted} onCancelled={handleConfirmCancelled} />}
  </Context.Provider>
}