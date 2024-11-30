import { useState } from 'react'

import logic from './logic'

import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'

import { Login, Register, Home } from './view'
import { Header } from './view/components'

export default function App() {
    const navigate = useNavigate()

    const handleUserLoggedIn = () => navigate('/')

    const handleRegisterAnchorClick = () => navigate('/register')

    const handleLoginAnchorClick = () => navigate('/login')

    const handleUserRegistered = () => navigate('/login')

    const handleLogout = () => navigate('/')

    const handleHomeClick = () => navigate('/')

    const handleLoginClick = () => navigate('/login')

    const handleRegisterClick = () => navigate('/register')

    return <main className="h-screen, w-screen">
        <Header onLoggedOut={handleLogout} onHomeClick={handleHomeClick} onLoginClick={handleLoginClick} onRegisterClick={handleRegisterClick} />

        <Routes>
            <Route path="/" element={<Home onLoginClick />} />

            <Route path="/login" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Login onLoggedIn={handleUserLoggedIn} onRegisterAnchorClick={handleRegisterAnchorClick} />} />

            <Route path="/register" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Register onLoginAnchorClick={handleLoginAnchorClick} onRegistered={handleUserRegistered} />} />
        </Routes>
    </main>
}