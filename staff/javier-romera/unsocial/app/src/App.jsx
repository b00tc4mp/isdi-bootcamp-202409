import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'

import { Login, Register, Home, CreatePost } from './view'
import Hello from './view/Hello'
import Search from './view/Search'

import Header from './view/components/Header'
import Footer from './view/components/Footer'
import Profile from './view/Profile'

import logic from './logic'

export default function App() {
  const navigate = useNavigate()

  const handlePostCreated = () => navigate('/')

  const handleUserLoggedOut = () => navigate('/login')

  const handleUserLoggedIn = () => navigate('/')

  const handleRegisterClick = () => navigate('/register')

  const handleLoginClick = () => navigate('/login')

  const handleUserRegistered = () => navigate('/login')

  const handleNewPostClick = () => navigate('/new-post')

  const handleHomeClick = () => navigate('/')

  return <>
    <Header
      onHomeClick={handleHomeClick}
      onLoggedOut={handleUserLoggedOut} />

    <Routes>
      <Route path="/login" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Login onLoggedIn={handleUserLoggedIn} onRegisterClick={handleRegisterClick} />} />

      <Route path="/register" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Register onLoginClick={handleLoginClick} onRegistered={handleUserRegistered} />} />

      <Route path="/" element={logic.isUserLoggedIn() ? <Home /> : <Navigate to="/login" />} />

      <Route path="/new-post" element={logic.isUserLoggedIn() ? <CreatePost onCreated={handlePostCreated} /> : <Navigate to="/login" />} />

      {/* extra demos */}
      <Route path="hello/:name" element={<Hello />} />
      <Route path="/search" element={<Search />} />
      <Route path="/profile/:userId/*" element={<Profile />}></Route>
    </Routes>

    <Footer
      onNewPostClick={handleNewPostClick} />
  </>
}