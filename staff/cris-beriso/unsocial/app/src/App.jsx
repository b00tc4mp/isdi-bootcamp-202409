import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'

import { Login, Register, Home, CreatePost, ProfileUser } from './view'
import Hello from './view/Hello'
import Search from './view/Search'
import Profile from './view/Profile'

import Header from './view/components/Header'
import Footer from './view/components/Footer'

import logic from './logic'

export default function App() {
  const navigate = useNavigate()

  const handlePostCreated = () => navigate('/') //setView('posts')

  const handleUserLoggedOut = () => navigate('/login') //setView('login')

  const handleUserLoggedIn = () => navigate('/') //setView('posts')

  const handleRegisterClick = () => navigate('/register') //setView('register')

  const handleLoginClick = () => navigate('/login') //setView('login')

  const handleUserRegirtered = () => navigate('/login') //setView('login')

  const handleNewPostClick = () => navigate('/new-post') //setView('new-post')

  const handlePostsClick = () => navigate('/') //setView('posts')

  const handleProfileClick = () => navigate('/profile') //setView('profile')


  console.log('App -> render')

  return <>
    <Header onHomeClick={handlePostsClick} onLoggedOut={handleUserLoggedOut} onProfile={handleProfileClick} />

    <Routes>
      <Route path="/login" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Login onLoggedIn={handleUserLoggedIn} onRegisterClick={handleRegisterClick} />} />

      <Route path="/register" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Register onRegisterIn={handleUserRegirtered} onLoginClick={handleLoginClick} />} />

      <Route path="/" element={logic.isUserLoggedIn() ? <Home /> : <Navigate to="/login" />} />

      <Route path="/new-post" element={logic.isUserLoggedIn() ? <CreatePost onCreated={handlePostCreated} /> : <Navigate to="/login" />} />

      {/* extra demos */}
      <Route path="/hello/:name" element={<Hello />} />
      <Route path="/search" element={<Search />} />
      <Route path="/profile/:userId/*" element={<Profile />} />

    </Routes>

    <Footer onNewPostClick={handleNewPostClick} />
  </>

}
