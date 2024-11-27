import { useState } from 'react'

import { Routes, Route, Navigate, useNavigate, Router } from 'react-router-dom'

import { Home, Login, Register, CreatePost } from './view'
import Hello from './view/Hello'
import Search from './view/Search'

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

    const handleHomeClick = () => navigate('/')

    const handleUserLoggedOut = () => navigate('/login')

    const handleUserLoggedIn = () => navigate('/')

    const handleRegisterLink = () => navigate('/register')

    const handleUserRegistered = () => navigate('/login')

    const handleLoginLink = () => navigate('/login')

    const handlePostCreated = () => navigate('/')

    const handleNewPostClick = () => navigate('/new-post')

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

    console.log('App -> render')

    return <Context.Provider value={{
        alert(message, level = 'error') { setAlert({ message, level }) },
        confirm(message, callback, level = 'error') { setConfirm({ message, callback, level }) }
    }}>
        <Header onHomeClick={handleHomeClick} onLoggedOut={handleUserLoggedOut} />

        <Routes>
            <Route path="/login" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Login onLoggedIn={handleUserLoggedIn} onRegisterLink={handleRegisterLink} />} />

            <Route path="/register" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Register onRegister={handleUserRegistered} onLoginLink={handleLoginLink} />} />

            <Route path="/" element={logic.isUserLoggedIn() ? <Home /> : <Navigate to="/login" />} />

            <Route path="/new-post" element={logic.isUserLoggedIn() ? <CreatePost onCreatePost={handlePostCreated} /> : <Navigate to="/login" />} />

            {/* demos for usefull routes */}
            <Route path="/hello/:name" element={<Hello />} />
            <Route path="/search" element={<Search />} />
        </Routes>

        <Footer onNewPostClick={handleNewPostClick} />

        {alert.message && <Alert message={alert.message} level={alert.level} onAccepted={handleAlertAccepted} />}

        {confirm.message && <Confirm message={confirm.message} level={confirm.level} onAccepted={handleConfirmAccepted} onCancelled={handleConfirmCancelled} />}
    </Context.Provider>
}