import { useState } from 'react'

import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'

import { Login, Register, Home, CreateRecommend } from './view/index.js' // add  CreateRecommend 

import Header from './view/components/Header.jsx' //import {Header, Footer} from './view/components'
import Footer from './view/components/Footer.jsx'
//TODO add profile page

import { Context } from './view/useContext.js'

import logic from './logic/index.js' //import loginUser from './logic/user/loginUser.js'

export default function App() {
  const [alert, setAlert] = useState({
    message: null,
    level: ''
  })

  const [confirm, setConfirm] = useState({
    message: null,
    level: 'error',
    callback: null
  })

  const navigate = useNavigate()

  const handleRecommendCreated = () => navigate('/')

  const handleUserLoggedOut = () => navigate('/login')

  const handleUserLoggedIn = () => navigate('/')

  const handleRegisterClick = () => navigate('/register')

  const handleLoginClick = () => navigate('/login')

  const handleUserRegistered = () => navigate('/login')

  const handleNewRecommendClick = () => navigate('/new-reco')

  const handleHomeClick = () => navigate('/')

  const handleAlertAccepted = () => setAlert({
    message: null,
    level: 'error'
  })

  const handleConfirmCancelled = () => {
    confirm.callback(false)

    setConfirm({
      message: null,
      level: 'error',
      callback: null
    })
  }
  //create handle confirm cancel

  console.log('App -> render')

  return <Context.Provider value={{
    alert(message, level = 'error') { setAlert({ message, level }) },
    confirm(message, callback, level = 'error') { setConfirm({ message, callback, level }) }
  }}>
    <Header onHomeClick={handleHomeClick} onLoggedout={handleUserLoggedOut} />

    <Routes>
      <Route path='/login' element={logic.isUserLoggedIn() ? <Navigate to='/' /> :
        <Login onLoggedIn={handleUserLoggedIn}
          onRegisterClick={handleRegisterClick} />} />

      <Route path='/register' element={logic.isUserLoggedIn() ? <Navigate to='/' /> :
        <Register onLoginClick={handleLoginClick}
          onRegistered={handleUserRegistered} />} />

      <Route path='/' element={logic.isUserLoggedIn() ? <Home /> :
        <Navigate to='/login' />} />

      <Route path='/new-recommend' element={logic.isUserLoggedIn() ? <CreateRecommend onCreated={handleRecommendCreated} /> : <Navigate to='/login' />} />

    </Routes>


    <Footer onNewRecommendClick={handleNewRecommendClick} />


    {alert.message && <Alert message={alert.message} level={alert.level} onAccepted={handleAlertAccepted} />}

    {confirm.message && <Confirm message={confirm.message} level={confirm.level} onAccepted={handleConfirmAccepted} onCancelled={handleConfirmCancelled} />}

  </Context.Provider>
}
