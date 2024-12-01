import { useState } from 'react'

import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'

import { Login, Register, Home, } from './view'

import Hello from './view/Hello'

import { Context } from './view/useContext'

import logic from './logic'
import { Alert, Menu } from './view/components'



export default function App() {
    const [alert, setAlert] = useState({
        message: null,
        level: 'error'
    })

    const navigate = useNavigate()

    const handlePostCreated = () => navigate('/')

    const handleUserLoggedOut = () => navigate('/login')

    const handleUserLoggedIn = () => navigate('/')

    const handleRegisterClick = () => navigate('/register')

    const handleLoginClick = () => navigate('/login')

    const handleUserRegistered = () => navigate('/login')
    const handleHomeClick = () => navigate('/')

    const handleAlertAccepted = () => setAlert({
        message: null,
        level: 'error'
    })


    return <Context.Provider value={{
        alert(message, level = 'error') { setAlert({ message, level }) }
    }}>
        <Routes>
            <Route path="/login" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Login onLoggedIn={handleUserLoggedIn} onRegisterClick={handleRegisterClick} />} />

            <Route path="/register" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Register onLoginClick={handleLoginClick} onRegistered={handleUserRegistered} />} />

            <Route path="/" element={logic.isUserLoggedIn() ? <Home /> : <Navigate to="/login" />} />

            {/* extra demos */}
            <Route path="/hello/:name" element={<Hello />} />
            {/* <Route path="/profile/:userId/*" element={<Profile />} /> */}
        </Routes>

        {alert.message && <Alert message={alert.message} level={alert.level} onAccepted={handleAlertAccepted} />}

        {logic.isUserLoggedIn() && <Menu />}


    </Context.Provider>
}