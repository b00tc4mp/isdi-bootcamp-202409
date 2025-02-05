import { useState } from 'react'

import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'

import { Login, Register, Home, ManagePacks, ManageCustomers, ManagePurchasedPacks, AssignPack, CreatePack, Tracker, UserProfile, CustomerPacks } from './view'

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

  //Navigation functions

  const handleHomeClick = () => navigate('/')

  const handleUserProfileClick = () => navigate('/user-profile')


  //Navigation throw user things
  const handleUserLoggedOut = () => navigate('/login')

  const handleUserLoggedIn = () => navigate('/')

  const handleRegisterClick = () => navigate('/register')

  const handleLoginClick = () => navigate('/login')

  const handleUserRegistered = () => navigate('/login')

  const handleCustomerPacks = () => navigate('/customer-packs')


  //Navigation throw packs things
  const handleManagePacksClick = () => navigate('/manage-packs')

  const handleManageCustomersClick = () => navigate('/manage-customers')

  const handleManagePurchasedPacksClick = () => navigate('/manage-purchased-packs')

  const handleAssignPack = () => navigate('/assign-pack')

  const handleCreatePack = () => navigate('/create-pack')


  //Navigation throw Tracking things
  const handleTrackerPacksClick = () => navigate('/tracker')



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

  const handleNotfoundError = event => {
    event.preventDefault(); // Previene el comportamiento por defecto del enlace
    handleHomeClick(); // Llama a la función para navegar al inicio
  }


  return (<Context.Provider value={{
    alert(message, level = 'error') { setAlert({ message, level }) },
    confirm(message, callback, level = 'error') { setConfirm({ message, callback, level }) }
  }}>
    <div className="flex flex-col min-h-screen">
      {location.pathname !== '/login' && (
        <Header onHomeClick={handleHomeClick} onLoggedOut={handleUserLoggedOut} onViewProfile={handleUserProfileClick} onTrackerClick={handleTrackerPacksClick} onManagePacksClick={handleManagePacksClick} onManageCustomersClick={handleManageCustomersClick} />
      )}
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
            onTrackerClick={handleTrackerPacksClick}

          /* onAssignPackClick={handleAssignPack} */ /> :
          <Navigate to="/login" />} />

        <Route path="/tracker" element={logic.isUserLoggedIn() ? <Tracker onHomeClick={handleHomeClick} /> : <Navigate to="/login" />} />

        <Route path="/manage-packs" element={logic.isUserLoggedIn() ?
          <ManagePacks onHomeClick={handleHomeClick}
            onAssignPackClick={handleAssignPack}
            onCreatePackClick={handleCreatePack}
            onPackDeleted={handleManagePacksClick} /> :
          <Navigate to="/login" />} />

        <Route path="/assign-pack" element={logic.isUserLoggedIn() ?
          <AssignPack onHomeClick={handleHomeClick} /> :
          <Navigate to="/login" />} />

        <Route path="/create-pack" element={logic.isUserLoggedIn() ?
          <CreatePack onHomeClick={handleHomeClick} onPackCreated={handleManagePacksClick} /> :
          <Navigate to="/login" />} />

        <Route path="/manage-customers" element={logic.isUserLoggedIn() ?
          <ManageCustomers onHomeClick={handleHomeClick}
            onCustomerPacksClick={handleCustomerPacks} /> :
          <Navigate to="/login" />} />

        <Route path="/manage-purchased-packs" element={logic.isUserLoggedIn() ?
          <ManagePurchasedPacks onHomeClick={handleHomeClick} /> :
          <Navigate to="/login" />} />

        <Route path="/user-profile" element={logic.isUserLoggedIn() ?
          <UserProfile onProfileUpdated={handleHomeClick} onProfileCancel={handleHomeClick} /> :
          <Navigate to="/login" />} />

        <Route path="/customer-packs/:customerId" element={logic.isUserLoggedIn() ?
          <CustomerPacks onHomeClick={handleHomeClick} /> :
          <Navigate to="/login" />} />

        <Route path="*" element={
          <div className="text-center">
            <h1 className="text-red-600 text-2xl font-bold">Error 404</h1>
            <p className="text-gray-700">This page does not exist or it was removed.</p>
            <p>
              You can try to{' '}
              <a href="#" className="text-blue-500 underline hover:text-blue-700" onClick={handleNotfoundError}>go home</a>
            </p>
          </div>
        } />
      </Routes>


      {alert.message && <Alert message={alert.message} level={alert.level} onAccepted={handleAlertAccepted} />}

      {confirm.message && <Confirm message={confirm.message} level={confirm.level} onAccepted={handleConfirmAccepted} onCancelled={handleConfirmCancelled} />}

      <Footer />
    </div>
  </Context.Provider >
  )
}