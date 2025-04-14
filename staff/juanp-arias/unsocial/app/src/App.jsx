import { useState } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import { Login, Register, Home, CreatePost, Profile } from './view'
import { Header, Footer, Alert, Confirm } from './view/components'
import { Context } from './view/useContext'

import logic from './logic'

export default function App() {
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

    const handlePostCreated = () => navigate('/')

    const handleUserLoggedOut = () => navigate('/login')

    const handleUserLoggedIn = () => navigate('/')

    const handleRegisterClick = () => navigate('/register')

    const handleLoginClick = () => navigate('/login')

    const handleUserRegistered = () => navigate('/login')

    const handleNewPostClick = () => navigate('/new-post')

    const handleHomeClick = () => navigate('/')

    const handleProfileClick = () => navigate('/profile')

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

    const handleConfirmCanceled = () => {
        confirm.callback(false)
        setConfirm({
            message: null,
            level: 'error',
            callback: null
        })
    }

    return <Context.Provider value={{
        alert(message, level = 'error') { setAlert({ message, level }) },
        confirm(message, callback, level = 'error') { setConfirm({ message, callback, level }) }
    }}>
        <Header
            onHomeClick={handleHomeClick}
            onLoggedOut={handleUserLoggedOut}
            onProfileClick={handleProfileClick} />

        <Routes>
            <Route path="/login"
                element={logic.isUserLoggedIn() ? <Navigate to="/" /> :
                    <Login onLoggedIn={handleUserLoggedIn} onRegisterClick={handleRegisterClick} />} />

            <Route path="/register"
                element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Register
                    onLoginClick={handleLoginClick}
                    onRegistered={handleUserRegistered}
                />} />

            <Route path="/"
                element={logic.isUserLoggedIn() ? <Home /> : <Navigate to="/login" />} />

            <Route path="/new-post"
                element={logic.isUserLoggedIn() ? <CreatePost onCreated={handlePostCreated} /> : <Navigate to="/login" />} />

            <Route path="/profile"
                element={logic.isUserLoggedIn() ? <Profile onHomeClick={handleHomeClick} /> : <Navigate to="/login" />} />
        </Routes>

        <Footer onNewPostClick={handleNewPostClick} />

        {alert.message &&
            <Alert
                message={alert.message}
                level={alert.level}
                onAccepted={handleAlertAccepted} />}

        {confirm.message &&
            <Confirm
                message={confirm.message}
                level={confirm.level}
                onAccepted={handleConfirmAccepted}
                onCanceled={handleConfirmCanceled} />}
    </Context.Provider>
}


