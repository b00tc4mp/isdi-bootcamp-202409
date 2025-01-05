import { useEffect, useState } from 'react'

import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'

import { Login, Register, Home, Profile, CreatePost, PostView, PetFoundView } from './view'

import { Context } from './view/useContext'

import logic from './logic'
import { Alert, Menu, Confirm } from './view/components'



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
    const [userId, setUserId] = useState({
        userId: null,
    })

    useEffect(() => {
        setUserId(logic.isUserLoggedIn() ? logic.getUserId() : null)
    })

    const navigate = useNavigate()

    //const handlePostCreated = () => navigate('/')

    const handleUserLoggedOut = () => {
        logic.logoutUser()
        navigate('/login')
    }

    const handleUserLoggedIn = () => navigate('/login')

    const handleRegisterClick = () => navigate('/register')

    const handleLoginClick = () => navigate('/login')

    const handleUserRegistered = () => navigate('/login')
    const handleHomeClick = () => navigate('/login')

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
        alert(message, level = 'error') { setAlert({ message, level }) },
        confirm(message, callback, level = 'error') { setConfirm({ message, callback, level }) }
    }}>
        <Routes>
            <Route path="/login" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Login onLoggedIn={handleUserLoggedIn} onRegisterClick={handleRegisterClick} />} />

            <Route path="/register" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Register onLoginClick={handleLoginClick} onRegistered={handleUserRegistered} />} />

            <Route path="/" element={logic.isUserLoggedIn() ? <Home /> : <Navigate to="/login" />} />



            <Route path="/profile/:userId" element={<Profile handleUserLoggedOut={handleUserLoggedOut} />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/post/:postId" element={<PostView />} />
            <Route path="/post-found/" element={<PetFoundView />} />

        </Routes>

        {alert.message && <Alert message={alert.message} level={alert.level} onAccepted={handleAlertAccepted} />}

        {confirm.message && <Confirm message={confirm.message} level={confirm.level} onAccepted={handleConfirmAccepted} onCancelled={handleConfirmCancelled} />}

        {logic.isUserLoggedIn() && <Menu userId={userId} />}


    </Context.Provider>
}