import { useState } from 'react'

import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'

import { Login, Register, Home, ManagePacks, ManageCustomers, ManagePurchasedPacks, AssignPack } from './view'

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

  //Navigation functions

  const handleHomeClick = () => navigate('/')



  //Navigation throw user things
  const handleUserLoggedOut = () => navigate('/login')

  const handleUserLoggedIn = () => navigate('/')

  const handleRegisterClick = () => navigate('/register')

  const handleLoginClick = () => navigate('/login')

  const handleUserRegistered = () => navigate('/login')



  //Navigation throw packs things
  const handleManagePacksClick = () => navigate('/manage-packs')

  const handleManageCustomersClick = () => navigate('/manage-customers')

  const handleManagePurchasedPacksClick = () => navigate('/manage-purchased-packs')

  const handleAssignPack = () => navigate('/assign-packs')



  //Functions to manage alerts and confirms
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
    <Header onHomeClick={handleHomeClick} onLoggedOut={handleUserLoggedOut} />

    <Routes>

      <Route path="/login" element={logic.isUserLoggedIn() ?
        <Navigate to="/" /> :
        <Login onLoggedIn={handleUserLoggedIn}
          onRegisterClick={handleRegisterClick} />} />

      <Route path="/register" element={logic.isUserLoggedIn() ?
        <Navigate to="/" /> :
        <Register onLoginClick={handleLoginClick}
          onRegistered={handleUserRegistered} />} />

      {/* Main view to initiate navigation everything */}
      <Route path="/" element={logic.isUserLoggedIn() ?
        <Home
          onManagePacksClick={handleManagePacksClick}
          onManageCustomersClick={handleManageCustomersClick}
          onManagePurchasedPacksClick={handleManagePurchasedPacksClick}
          /* onAssignPackClick={handleAssignPack} */ /> :
        <Navigate to="/login" />} />


      <Route path="/manage-packs" element={logic.isUserLoggedIn() ?
        <ManagePacks onHomeClick={handleHomeClick}
          onAssignPackClick={handleAssignPack} /> :
        <Navigate to="/login" />} />

      <Route path="/assign-pack" element={logic.isUserLoggedIn() ?
        <AssignPack onHomeClick={handleHomeClick} /> :
        <Navigate to="/login" />} />

      <Route path="/manage-customers" element={logic.isUserLoggedIn() ?
        <ManageCustomers onHomeClick={handleHomeClick} /> :
        <Navigate to="/login" />} />

      <Route path="/manage-purchased-packs" element={logic.isUserLoggedIn() ?
        <ManagePurchasedPacks onHomeClick={handleHomeClick} /> :
        <Navigate to="/login" />} />




    </Routes>

    {alert.message && <Alert message={alert.message} level={alert.level} onAccepted={handleAlertAccepted} />}

    {confirm.message && <Confirm message={confirm.message} level={confirm.level} onAccepted={handleConfirmAccepted} onCancelled={handleConfirmCancelled} />}
  </Context.Provider>
}