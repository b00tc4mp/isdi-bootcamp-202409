import { useState } from 'react'

import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'

import { Login, Register, Home, CreatePost } from './view'

import Hello from './view/Hello'
import Search from './view/Search'
import Profile from './view/Profile'

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

    const handlePostCreated = () => navigate('/') // setView('posts')

    const handleUserLoggedOut = () => navigate('/login') //navigate('/login')

    const handleUserLoggedIn = () => navigate('/') // setView('posts')

    const handleRegisterClick = () => navigate('/register') // setView('register')

    const handleLoginClick = () => navigate('/login') // setView('login')

    const handleUserRegistered = () => navigate('/login') // setView('login')

    const handleNewPostClick = () => navigate('/new-post') // setView('new-post')

    const handleHomeClick = () => navigate('/') // setView('posts')

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
        alert(message, level = 'error') { setAlert({
            message, level }) },
            confirm(message, callback, level = 'error') {
            setConfirm({ message, callback, level}) }
    }}>

        <Header onHomeClick={handleHomeClick} onLoggedOut={handleUserLoggedOut} />

        {/* {view === 'login' && <Login onLoggedIn={handleUserLoggedIn} onRegisterClick={handleRegisterClick} />} */}

        {/* {view === 'register' && <Register onLoginClick={handleLoginClick} onRegistered={handleUserRegistered} />} */}

        {/* {view === 'posts' && <Home />} */}

        {/* {view === 'new-post' && <CreatePost onCreated={handlePostCreated} />} */}

        <Routes>
            <Route path="/login" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Login onLoggedIn={handleUserLoggedIn} onRegisterClick={handleRegisterClick} />} />

            <Route path="/register" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Register onLoginClick={handleLoginClick} onRegistered={handleUserRegistered} />} />

            <Route path="/" element={logic.isUserLoggedIn() ? <Home /> : <Navigate to="/login" />} />

            <Route path="/new-post" element={logic.isUserLoggedIn() ? <CreatePost onCreated={handlePostCreated} /> : <Navigate to="/login" />} />

            {/* extra demos */}
            <Route path="/hello/:name" element={<Hello />} />
            <Route path="/search" element={<Search />} />
            <Route path="/profile/:userId/*" element={<Profile />} />
        </Routes>

        <Footer onNewPostClick={handleNewPostClick} />

        {alert.message && <Alert message={alert.message} level={alert.level} onAccepted={handleAlertAccepted} />}

        {confirm.message && <Confirm message={confirm.message} level={confirm.level} onAccepted={handleConfirmAccepted} onCancelled={handleConfirmCancelled} />}
    </Context.Provider>
}