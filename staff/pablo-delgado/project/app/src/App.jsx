import React, { useState } from 'react'
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom'
import Login from '../view/Login.jsx'
import Register from '../view/Register.jsx'
import Profile from '../view/Profile.jsx'
import Home from '../view/Home.jsx'
import ResultsPreview from '../view/ResultsPreview.jsx'
import Results from '../view/Results.jsx'
import Appointments from '../view/Appointments.jsx'
import Favourites from '../view/Favourites.jsx'
import Reviews from '../view/Reviews.jsx'
import logic from '../logic/index.js'
import { Confirm } from '../view/components/Confirm.jsx'
import { Context } from '../view/useContext.jsx'
import { Alert } from '../view/components/Alert.jsx'
import { Footer } from '../view/components/Footer.jsx'
import AccountDetails from '../view/AccountDetails.jsx'
import ChangePassword from '../view/ChangePassword.jsx'
import PartnerProfile from '../view/PartnerProfile.jsx'
import FAQ from '../view/FAQ.jsx'
import MyPets from '../view/MyPets.jsx'
import PetDetails from '../view/PetDetails.jsx'
import AddPet from '../view/addPet.jsx'
import PaymentHistory from '../view/PaymentHistory.jsx'
import Settings from '../view/Settings.jsx'
import { SettingsProvider } from '../view/SettingsContext.jsx'

import getUserFromToken from '../logic/users/__getUserFromToken.js'

export default function App() {
  const [alert, setAlert] = useState({ message: null, level: 'error' })
  const [confirm, setConfirm] = useState({ message: null, level: 'error', callback: null })
  const [user, setUser] = useState(getUserFromToken())

  const navigate = useNavigate()
  const location = useLocation()

  const handleUserLoggedOut = () => {
    localStorage.removeItem('token')
    setUser(null)
    navigate('/login')
  }

  const handleUserLoggedIn = () => {
    const decoded = getUserFromToken()
    setUser(decoded)
    navigate('/profile')
  }

  const handleRegisterClick = () => navigate('/register')
  const handleLoginClick = () => navigate('/login')
  const handleUserRegistered = () => navigate('/profile')
  const handleHomeClick = () => navigate('/')
  const handleChangePasswordClick = () => navigate('/forgot-password')
  const handleAlertAccepted = () => setAlert({ message: null, level: 'error' })

  const handleConfirmAccepted = () => {
    confirm.callback(true)
    setConfirm({ message: null, level: 'error', callback: null })
  }

  const handleConfirmCancelled = () => {
    confirm.callback(false)
    setConfirm({ message: null, level: 'error', callback: null })
  }

  console.log('App -> render')

  return (
    <SettingsProvider>
      <Context.Provider
        value={{
          alert(message, level = 'error') {
            setAlert({ message, level })
          },
          confirm(message, callback, level = 'error') {
            setConfirm({ message, callback, level })
          },
          user,
          setUser
        }}
      >
        <Routes>
          <Route path="/" element={<Home onLoggedIn={handleUserLoggedIn} onRegisterClick={handleRegisterClick} />} />
          <Route path="/login" element={<Login onLoggedIn={handleUserLoggedIn} onRegisterClick={handleRegisterClick} />} />
          <Route path="/register" element={<Register onLoginClick={handleLoginClick} onRegistered={handleUserRegistered} />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/accountdetails" element={<AccountDetails />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/home" element={<Home />} />
          <Route path="/resultspreview" element={<ResultsPreview />} />
          <Route path="/results" element={<Results />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/partner/:id" element={<PartnerProfile />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/mypets" element={<MyPets />} />
          <Route path="/pets/:petId" element={<PetDetails />} />
          <Route path="/addpet" element={<AddPet />} />
          <Route path="/payments" element={<PaymentHistory />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>

        {alert.message && (
          <Alert message={alert.message} level={alert.level} onAccepted={handleAlertAccepted} />
        )}

        {confirm.message && (
          <Confirm
            message={confirm.message}
            level={confirm.level}
            onAccepted={handleConfirmAccepted}
            onCancelled={handleConfirmCancelled}
          />
        )}

        {user && !['/login', '/register'].includes(location.pathname) && <Footer />}
      </Context.Provider>
    </SettingsProvider>
  )
}
