import { Route, Routes, useNavigate, Navigate } from 'react-router-dom'

import { Login, Register, Home, CreatePost } from './view'

import Header from './components/functional/Header'
import Footer from './components/functional/Footer'

import logic from './logic'


export default function App() {
  const navigate = useNavigate()

  const handlePostCreated = () => navigate('/') //setView('posts')

  const handleUserLoggedOut = () => navigate('/login') //setView('login')

  const handleUserLoggedIn = () => navigate('/')//setView('posts')

  const handleRegisterClick = () => navigate('/register')//setView('register')

  const handleLoginClick = () => navigate('/login') //setView('login')

  const handleUserRegistered = () => navigate('/login') //setView('login')

  const handleNewPostClick = () => navigate('/new-post') //setView('new-post')

  const handleHomeClick = () => navigate('/') //setView('posts')


  console.log('App -> render')

  return <>
    <Header onHomeClick={handleHomeClick} onLoggedOut={handleUserLoggedOut} />

    <Routes>
      <Route path="/login" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Login onLoggedIn={handleUserLoggedIn} onRegisterClick={handleRegisterClick} />} />

      <Route path="/register" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Register onLoginClick={handleLoginClick} onRegistered={handleUserRegistered} />} />

      <Route path="/" element={logic.isUserLoggedIn() ? <Home /> : <Navigate to="/login" />} />

      <Route path="/new-post" element={logic.isUserLoggedIn() ? <CreatePost onCreated={handlePostCreated} /> : <Navigate to="/login" />} />
    </Routes>

    <Footer onNewPostClick={handleNewPostClick} />
  </>
}

