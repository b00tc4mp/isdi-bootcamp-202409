import { useState } from 'react'

import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'

import { Login, Register, Home, CreatePost } from './view'

import Hello from './view/Hello'
import Profile from './view/Profile'

import { Header, Footer, Alert, Confirm } from './view/components/functional'

import { Context } from './view/useContext'

import logic from './logic'

export default function App() {
  const [alert, setAlert] = useState({
    message: null,
    level: 'error',
  })

  const [confirm, setConfirm] = useState({
    message: null,
    level: 'error',
    callback: null,
  })

  const navigate = useNavigate()

  const handleUserLoggedOut = () => {
    navigate('/login')
    logic.logoutUser()
  }

  const handleUserloggedIn = () => navigate('/')

  const handleAnchorRegister = () => navigate('/register')

  const handleUserRegistered = () => navigate('/login')

  const handleAnchorLogin = () => navigate('/login')

  const handlePostCreated = () => navigate('/')

  const handleNewPostClick = () => navigate('/new-post')

  const handleHomeClick = () => navigate('/')

  const handleProfileClick = () => {
    const userId = logic.getUserId()
    navigate(`/profile/${userId}`)
  }

  const handleAlertAccepted = () =>
    setAlert({
      message: null,
      level: 'error',
    })

  const handleConfirmAccepted = () => {
    confirm.callback(true)

    setConfirm({
      message: null,
      level: 'error',
      callback: null,
    })
  }

  const handleConfirmCancelled = () => {
    confirm.callback(false)

    setConfirm({
      message: null,
      level: 'error',
      callback: null,
    })
  }

  console.log('App -> render')

  return (
    <Context.Provider
      value={{
        alert(message, level = 'error') {
          setAlert({ message, level })
        },
        confirm(message, callback, level = 'error') {
          setConfirm({ message, callback, level })
        },
      }}
    >
      <Header onHomeClick={handleHomeClick} onLoggedOut={handleUserLoggedOut} />

      <Routes>
        <Route
          path="/login"
          element={
            logic.isUserLoggedIn() ? (
              <Navigate to="/" />
            ) : (
              <Login onLoggedIn={handleUserloggedIn} onAnchorRegister={handleAnchorRegister} />
            )
          }
        />

        <Route
          path="/register"
          element={
            logic.isUserLoggedIn() ? (
              <Navigate to="/" />
            ) : (
              <Register onRegistered={handleUserRegistered} onAnchorLogin={handleAnchorLogin} />
            )
          }
        />

        <Route path="/" element={logic.isUserLoggedIn() ? <Home /> : <Navigate to="/login" />} />

        <Route
          path="/new-post"
          element={logic.isUserLoggedIn() ? <CreatePost onCreated={handlePostCreated} /> : <Navigate to="/login" />}
        />

        {/* {extra demos} */}
        <Route path="/hello/:name" element={<Hello />} />
        <Route path="/profile/:userId" element={<Profile />} />
      </Routes>

      <Footer onHomeClick={handleHomeClick} onNewPostClick={handleNewPostClick} onProfileClick={handleProfileClick} />

      {alert.message && <Alert message={alert.message} level={alert.level} onAccepted={handleAlertAccepted} />}

      {confirm.message && (
        <Confirm
          message={confirm.message}
          level={confirm.level}
          onAccepted={handleConfirmAccepted}
          onCancelled={handleConfirmCancelled}
        />
      )}
    </Context.Provider>
  )
}
