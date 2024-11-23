import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'

import { Login, Register, Home, CreatePost } from "./view"

import Hello from './view/Hello'
import Profile from './view/Profile'

import { Header, Footer } from './view/components/functional'

import logic from "./logic"

export default function App() {
  const navigate = useNavigate()

  const handleUserLoggedOut = () => {
    navigate('/login')
    logic.logoutUser()
  }

  const handleUserloggedIn = () => navigate('/') //setView('posts')

  const handleAnchorRegister = () => navigate('/register') //setView('register')

  const handleUserRegistered = () => navigate('/login')

  const handleAnchorLogin = () => navigate('/login')

  const handlePostCreated = () => navigate('/') //setView('posts')

  const handleNewPostClick = () => navigate('/new-post') //setView('new-post')

  const handleHomeClick = () => navigate('/') //setView('posts')

  const handleProfileClick = () => {
    const userId = logic.getUserId()
    navigate(`/profile/${userId}`)
  }

  console.log('App -> render')

  return (
    <>
      <Header
        onHomeClick={handleHomeClick}
        onLoggedOut={handleUserLoggedOut} />

      <Routes>
        <Route
          path='/login'
          element={
            logic.isUserLoggedIn() ?
              <Navigate to='/' /> :
              <Login
                onLoggedIn={handleUserloggedIn}
                onAnchorRegister={handleAnchorRegister}
              />} />

        <Route
          path='/register'
          element={
            logic.isUserLoggedIn() ?
              <Navigate to='/' /> :
              <Register
                onRegistered={handleUserRegistered}
                onAnchorLogin={handleAnchorLogin}
              />} />

        <Route
          path='/'
          element={
            logic.isUserLoggedIn() ?
              <Home /> :
              <Navigate to='/login' />
          } />

        <Route
          path='/new-post'
          element={
            logic.isUserLoggedIn() ?
              <CreatePost
                onCreated={handlePostCreated} /> :
              <Navigate to='/login' />
          } />

        {/* {extra demos} */}
        <Route path="/hello/:name" element={<Hello />} />
        <Route path="/profile/:userId" element={<Profile />} />

      </Routes>

      <Footer
        onHomeClick={handleHomeClick}
        onNewPostClick={handleNewPostClick}
        onProfileClick={handleProfileClick} />
    </>
  )
}

