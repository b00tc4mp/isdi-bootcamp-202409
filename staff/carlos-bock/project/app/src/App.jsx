import { useState } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import { Login, Register, Home, CreateRecommend, Profile, RecommendDetail, RecommendCategoryCountry } from './view/index.js' // add  CreateRecommend 
import { Header, Footer, Alert, Confirm } from './view/components/index.js'
import { Context } from './view/useContext.js'

import logic from './logic/index.js'
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

  const handleProfileClick = () => { const userId = logic.getUserId(); navigate(`/recommends/users/${userId}`) }


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
    <div className={`pt-10 pb-20 px-3 ${alert.message || confirm.message ? 'h-screen overflow-hidden' : ''}  `}>
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

        <Route path='/categories/:category/countries/:country' element={logic.isUserLoggedIn() ? <RecommendCategoryCountry /> : <Navigate to='/login' />} />

        <Route path='/recommends/users/:userId/' element={logic.isUserLoggedIn() ? <Profile /> : <Navigate to='/login' />} />

        <Route path='/recommend/:id' element={logic.isUserLoggedIn() ? <RecommendDetail /> : <Navigate to='/login' />}
        />


      </Routes>
    </div>
    <Footer onNewRecommendClick={handleNewRecommendClick}
      onCategoriesClick={handleCategoriesclick}
      onProfileClick={handleProfileClick}
    />

    {alert.message && <Alert message={alert.message} level={alert.level} onAccepted={handleAlertAccepted} />}

    {confirm.message && <Confirm message={confirm.message} level={confirm.level} onAccepted={handleConfirmAccepted} onCancelled={handleConfirmCancelled} />}

  </Context.Provider>
}
