import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'

import { Login, Register, Home } from './view'

import Header from './view/components/Header'

import logic from './logic'

export default function App() {
  const navigate = useNavigate()

  const handleUserLoggedOut = () => navigate('/login')

  const handleUserLoggedIn = () => navigate('/')

  const handleRegisterClick = () => navigate('/register')

  const handleLoginClick = () => navigate('/login')

  const handleUserRegistered = () => navigate('/login')

  const handleHomeClick = () => navigate('/')

  console.log('App -> render')

  return <>
    <Header onHomeClick= {handleHomeClick} onLoggedOut= {handleUserLoggedOut} />

    <Routes>
        <Route path="/login" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Register onLoginClick={handleLoginClick} onRegistered={handleRegisterClick} />} />

        <Route path="/" element={logic.isUserLoggedIn() ? <Home /> : <Navigate to="/login" />} />
    </Routes>
  </>
}