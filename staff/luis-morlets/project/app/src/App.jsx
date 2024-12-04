import { useState } from 'react'

import { Route, Routes, Navigate, useNavigate, Router } from 'react-router-dom'

import { Login, Register, Home } from './view'

import { Context } from './view/useContext'

import logic from './logic'
import { Alert, Confirm } from './view/components'

export default function App() {
    console.log('App -> render')

    const [alert, setAlert] = useState({
        message: null,
        level: 'error'
    })

    const [confirm, setConfirm] = useState({
        message: null,
        level: 'error',
        callback: null
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

    const handleConfirmAccepted = () => {
        confirm.callback(true)

        setConfirm({
            message: null,
            level: 'error',
            callback: null
        })
    }

    const handleConfirmCancelled = () => {
        confirm.callback(false)

        setConfirm({
            message: null,
            level: 'error',
            callback: null
        })
    }

    return <Context.Provider value={{
        alert(message, level = 'error') {
            setAlert({ message, level })
        }, confirm(message, callback, level = 'error') { setConfirm({ message, callback, level }) }
    }}>

        <Routes>
            <Route path="/login" element={logic.isPlayerLoggedIn() ? <Navigate to="/" /> : <Login onLoggedIn={handleUserLoggedIn} onRegisterClick={handleRegisterClick} />} />

            <Route path="/register" element={logic.isPlayerLoggedIn() ? <Navigate to="/" /> : <Register onRegistered={handleUserRegistered} onLoginClick={handleLoginClick} />} />

            <Route path="/" element={logic.isPlayerLoggedIn() ? <Home onLoggedOut={handleUserLoggedOut} /> : <Navigate to="/login" />} />
        </Routes>

        {alert.message && <Alert message={alert.message} level={alert.level} onAccepted={handleAlertAccepted} />}

        {confirm.message && <Confirm message={confirm.message} level={confirm.level} onAccepted={handleConfirmAccepted} onCancelled={handleConfirmCancelled} />}
    </Context.Provider>
}