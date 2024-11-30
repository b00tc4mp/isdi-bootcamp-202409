import { useState } from 'react'

import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'

import { Login, Register, Home } from './view/index.js' // add  CreateRecommend 

import Header from './view/components/Header.jsx' //import {Header, Footer} from './view/components'
import Footer from './view/components/Footer.jsx'

//import { Context } from './view/useContext.js'

import logic from './logic/index.js' //import loginUser from './logic/user/loginUser.js'

export default function App() {
  //const [count, setCount] = useState(0) // space saver

  const navigate = useNavigate()

  const handleRecommendCreated = () => navigate('/')

  const handleUserLoggedOut = () => navigate('/login')

  const handleUserLoggedIn = () => navigate('/')

  const handleRegisterClick = () => navigate('/register')

  const handleLoginClick = () => navigate('/login')

  const handleUserRegistered = () => navigate('/login')

  const handleNewRecommendClick = () => navigate('/new-reco')

  const handleHomeClick = () => navigate('/')

  //create handle alert

  //create handle confirm accepted

  //create handle confirm cancel

  console.log('App -> render')

  return <div>
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

    </Routes>


    <Footer onNewRecommendClick={handleNewRecommendClick} />
  </div>
}

/*<Context.Provider value={{
  alert(message, level = 'error') { setAlert({ message, level }) },
  confirm(message, callback, level = 'error') { setConfirm({ message, callback, level }) }
}}>

*/