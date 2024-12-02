import { useState } from 'react'

import { Route, Routes, Navigate, useNavigate, Router } from 'react-router-dom'

import { Login, Register, Home } from './view'

import { Context } from './view/useContext'

import logic from './logic'
import Alert from './view/components/Alert'

export default function App() {
    console.log('App -> render')

    const [alert, setAlert] = useState({
        message: null,
        level: 'error'
    })

    const navigate = useNavigate()

    const handleLoginClick = () => navigate('/login')

    const handleUserRegistered = () => navigate('/login')

    const handleRegisterClick = () => navigate('/register')

    const handleUserLoggedIn = () => navigate('/')

    const handleUserLoggedOut = () => navigate('/login')

    const handleAlertAccepted = () => setAlert({
        message: null,
        level: 'error'
    })

    return <Context.Provider value={{
        alert(message, level = 'error') {
            setAlert({ message, level })
        }
    }}>

        <Routes>
            <Route path="/login" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Login onLoggedIn={handleUserLoggedIn} onRegisterClick={handleRegisterClick} />} />

            <Route path="/register" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Register onRegistered={handleUserRegistered} onLoginClick={handleLoginClick} />} />

            <Route path="/" element={logic.isUserLoggedIn() ? <Home onLoggedOut={handleUserLoggedOut} /> : <Navigate to="/login" />} />
        </Routes>

        {alert.message && <Alert message={alert.message} level={alert.level} onAccepted={handleAlertAccepted} />}
    </Context.Provider>
}