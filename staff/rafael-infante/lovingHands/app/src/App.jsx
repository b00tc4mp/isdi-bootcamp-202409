import { useState } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import { Login, Home, Register, Welcome, CreateAd, AdList, FavoriteAds, Settings } from './view'
import { Header, Footer, Alert, Confirm } from './view/components'

import { Context } from './view/useContext.js'

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

  const handleUserRegistered = () => navigate('/login')
  const handleUserLoggedIn = () => navigate('/')
  const handleRegisterClick = () => navigate('/register')
  const handleLoginClick = () => navigate('/login')
  const handleAdCreated = () => navigate('/')
  const handleUserLoggedOut = () => navigate('/')
  const handleNewAdClick = () => navigate('/new-ad')
  const handleHomeClick = () => navigate('/')
  // const handleDarkModeClick
  const handleSettingsClick = () => navigate('/settings')
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

  console.debug('App -> render')
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
      {logic.isUserLoggedIn() && <Header onLoggedOut={handleUserLoggedOut} />}
      <Routes>
        <Route path="/welcome" element={<Welcome onLoginClick={handleLoginClick} />} />

        <Route
          path="/register"
          element={<Register onRegistered={handleUserRegistered} onLoginClick={handleLoginClick} />}
        />

        <Route
          path="/login"
          element={
            logic.isUserLoggedIn() ? (
              <Home />
            ) : (
              <Login onLoggedIn={handleUserLoggedIn} onRegisterClick={handleRegisterClick} />
            )
          }
        />

        <Route path="/" element={logic.isUserLoggedIn() ? <Home /> : <Navigate to="/welcome" />} />
        <Route path="/ads" element={<AdList />} />
        <Route
          path="/new-ad"
          element={logic.isUserLoggedIn() ? <CreateAd onCreated={handleAdCreated} /> : <Navigate to="/welcome" />}
        />
        <Route path="/favorites" element={logic.isUserLoggedIn() ? <FavoriteAds /> : <Navigate to="/welcome" />} />

        <Route path="/settings" element={logic.isUserLoggedIn() ? <Settings /> : <Navigate to="/welcome" />} />
      </Routes>
      {logic.isUserLoggedIn() && (
        <Footer
          onNewAdClick={handleNewAdClick}
          onHomeClick={handleHomeClick}
          // onDarkModeClick={handleDarkModeClick}
          onSettingsClick={handleSettingsClick}
        />
      )}

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
