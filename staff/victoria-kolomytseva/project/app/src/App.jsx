import { useEffect, useState } from 'react'

import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'

import { Login, Register, Home, Hello, Profile, CreatePost, PostView } from './view'

import { Context } from './view/useContext'

import logic from './logic'
import { Alert, Menu } from './view/components'



export default function App() {
    const [alert, setAlert] = useState({
        message: null,
        level: 'error'
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


    return <Context.Provider value={{
        alert(message, level = 'error') { setAlert({ message, level }) }
    }}>
        <Routes>
            <Route path="/login" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Login onLoggedIn={handleUserLoggedIn} onRegisterClick={handleRegisterClick} />} />

            <Route path="/register" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Register onLoginClick={handleLoginClick} onRegistered={handleUserRegistered} />} />

            <Route path="/" element={logic.isUserLoggedIn() ? <Home /> : <Navigate to="/login" />} />


            <Route path="/hello/:name" element={<Hello />} />
            <Route path="/profile/:userId" element={<Profile handleUserLoggedOut={handleUserLoggedOut} />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/post/:postId" element={<PostView />} />

        </Routes>

        {alert.message && <Alert message={alert.message} level={alert.level} onAccepted={handleAlertAccepted} />}

        {logic.isUserLoggedIn() && <Menu userId={userId} />}


    </Context.Provider>
}