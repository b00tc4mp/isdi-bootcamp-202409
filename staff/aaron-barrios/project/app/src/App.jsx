import { useState } from 'react'

import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'

//

import { Home, Login, Register, Profile } from './view'

import { Header } from './view/components'

import logic from './logic'

export default function App() {
    const navigate = useNavigate()

    const handleUserLoggedIn = () => navigate('/')

    const handleUserLoggedOut = () => navigate('/login')

    const handleRegisterClick = () => navigate('/register')

    const handleLoginClick = () => navigate('/login')

    const handleUserRegistered = () => navigate('/login')

    const handleHomeClick = () => navigate('/')

    const handleProfileClick = () => navigate('/profile') //CHANGE

    const handleSettingsClick = () => navigate('/settings') //CHANGE

    return <div>
        <Header onProfileClick={handleProfileClick} onLoggedOut={handleUserLoggedOut} />

        <Routes>
            <Route path="/login" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Login onLoggedIn={handleUserLoggedIn} onRegisterClick={handleRegisterClick} />} />

            <Route path="/register" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Register onLoginClick={handleLoginClick} onRegistered={handleUserRegistered} />} />


            <Route path="/" element={logic.isUserLoggedIn() ? <Home /> : <Navigate to="/login" />} />

            <Route path="/profile/:userId/*" element={<Profile />} />
        </Routes>
    </div>
}