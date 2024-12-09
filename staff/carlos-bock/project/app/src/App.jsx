import { useState } from 'react'

import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'

import { Login, Register, Home, CreateRecommend, Profile, RecommendDetail } from './view/index.js' // add  CreateRecommend 

//TODO add profile page

//import Header from './view/components/Header.jsx'; import Footer from './view/components/Footer.jsx'
import { Header, Footer, Alert, Confirm } from './view/components/index.js'

import { Context } from './view/useContext.js'

import logic from './logic/index.js' //import loginUser from './logic/user/loginUser.js'
import Categories from './view/components/Categories.jsx'

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

  const handleCategoriesclick = () => navigate('/categories')

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
    confirm(message, callback, level = 'error') { console.log('Confirm called with message:', message); setConfirm({ message, callback, level }) }
  }}>
    <Header onHomeClick={handleHomeClick} onLoggedout={handleUserLoggedOut} />
    <div className='content'>
      <Routes>
        <Route path='/login' element={logic.isUserLoggedIn() ? <Navigate to='/' /> :
          <Login onLoggedIn={handleUserLoggedIn}
            onRegisterClick={handleRegisterClick} />} />

        <Route path='/register' element={logic.isUserLoggedIn() ? <Navigate to='/' /> :
          <Register onLoginClick={handleLoginClick}
            onRegistered={handleUserRegistered} />} />

        <Route path='/' element={logic.isUserLoggedIn() ? <Home /> :
          <Navigate to='/login' />} />

        <Route path='/new-reco' element={logic.isUserLoggedIn() ? <CreateRecommend onCreated={handleRecommendCreated} /> :
          <Navigate to='/login' />} />

        <Route path='/categories' element={logic.isUserLoggedIn() ? <Categories /> : <Navigate to='/login' />} />

        <Route path='/profile/:userId/*' element={logic.isUserLoggedIn() ? <Profile /> : <Navigate to='/login' />} />

        <Route path='/recommend/:id' element={logic.isUserLoggedIn() ? <RecommendDetail /> : <Navigate to='/login' />}
        />


      </Routes>
    </div>
    <Footer onNewRecommendClick={handleNewRecommendClick} onCategoriesClick={handleCategoriesclick} />

    {alert.message && <Alert message={alert.message} level={alert.level} onAccepted={handleAlertAccepted} />}

    {confirm.message && <Confirm message={confirm.message} level={confirm.level} onAccepted={handleConfirmAccepted} onCancelled={handleConfirmCancelled} />}

  </Context.Provider>
}
