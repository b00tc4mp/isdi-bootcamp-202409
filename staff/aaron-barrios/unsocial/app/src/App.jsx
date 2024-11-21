import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'

import { Login, Register, Home, CreatePost } from './view'

import Header from './components/functional/Header'
import Footer from './components/functional/Footer'
import ProfileData from './components/functional/ProfileData'


import logic from './logic'


export default function App() {
  const navigate = useNavigate()

  const handlePostCreated = () => navigate('/')

  const handleUserLoggedOut = () => navigate('login')

  const handleUserLoggedIn = () => navigate('/')

  const handleRegisterClick = () => navigate('register')

  const handleLoginClick = () => navigate('login')

  const handleUserRegistered = () => navigate('login')

  const handleNewPostClick = () => navigate('new-post')

  const handleHomeClick = () => navigate('/')

  const handlProfileClick = () => navigate('profile')


  return <>
    <Header
      onHomeClick={handleHomeClick}
      onLoggedOut={handleUserLoggedOut}
      onProfileClick={handleUserRegistered} />


    <Routes>

      <Route path="/login" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Login onLoggedIn={handleUserLoggedIn} onRegisterClick={handleRegisterClick} />} />

      <Route path="/register" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Register onLoginClick={handleLoginClick} onRegistered={handleUserRegistered} />} />

      <Route path="/" element={logic.isUserLoggedIn() ? <Home /> : <Navigate to="/login" />} />

      <Route path="/new-post" element={logic.isUserLoggedIn() ? <CreatePost onCreated={handlePostCreated} /> : <Navigate to="/login" />} />

      {/* profile data (WIP) */}
      <Route path="/profile" element={logic.isUserLoggedIn() ? <ProfileData
        home={handleHomeClick}
        onProfile={handlProfileClick} />
        : <Navigate to="/login" />}
      />

    </Routes>


    <Footer onNewPostClick={handleNewPostClick} />
  </>
}

