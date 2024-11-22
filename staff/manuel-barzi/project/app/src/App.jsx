import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'

import { Login, Register, Home } from './view'

import Header from './view/components/Header'

import logic from './logic'

export default function App() {
    const navigate = useNavigate()

    const handleUserLoggedOut = () => navigate('/login') //navigate('/login')

    const handleUserLoggedIn = () => navigate('/') // setView('posts')

    const handleRegisterClick = () => navigate('/register') // setView('register')

    const handleLoginClick = () => navigate('/login') // setView('login')

    const handleUserRegistered = () => navigate('/login') // setView('login')

    const handleHomeClick = () => navigate('/') // setView('posts')


    console.log('App -> render')

    return <>
        <Header onHomeClick={handleHomeClick} onLoggedOut={handleUserLoggedOut} />

        <Routes>
            <Route path="/login" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Login onLoggedIn={handleUserLoggedIn} onRegisterClick={handleRegisterClick} />} />

            <Route path="/register" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Register onLoginClick={handleLoginClick} onRegistered={handleUserRegistered} />} />

            <Route path="/" element={logic.isUserLoggedIn() ? <Home /> : <Navigate to="/login" />} />
        </Routes>
    </>
}