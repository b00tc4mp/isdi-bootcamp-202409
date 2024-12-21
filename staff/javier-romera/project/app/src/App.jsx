import logic from './logic'

import { Routes, Route, useNavigate, Navigate, useLocation } from 'react-router-dom'

import { useState } from 'react'

import { Context } from './view/useContext'

import { Login, Register, Home } from './view'
import { Header, NoUserLoggedInAlert, OnePieceDle, OneDoku, EastBlueMap, Alert, Confirm, Profile } from './view/components'

export default function App() {
    const [profileView, setProfileView] = useState(false)

    const [alert, setAlert] = useState({
        message: null,
        level: 'error'
    })

    const [confirm, setConfirm] = useState({
        message: null,
        level: 'error',
        callback: null
    })

    const location = useLocation()

    const navigate = useNavigate()

    const handleUserLoggedIn = () => navigate('/')

    const handleRegisterAnchorClick = () => navigate('/register')

    const handleLoginAnchorClick = () => navigate('/login')

    const handleUserRegistered = () => navigate('/login')

    const handleLogout = () => navigate('/login')

    const handleHomeClick = () => navigate('/')

    const handleLoginClick = () => navigate('/login')

    const handleRegisterClick = () => navigate('/register')

    const handlePlayAsGuestClick = () => navigate('/')

    const handleOnePieceDleClick = () => navigate('/onepiecedle')

    const handleOneDokuClick = () => navigate('/onedoku')

    const handleEastBlueMapClick = () => navigate('/eastblue')

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
        <main className="h-screen, w-screen">
            <Header onLoggedOut={handleLogout} onHomeClick={handleHomeClick} onLoginClick={handleLoginClick} onRegisterClick={handleRegisterClick} profileView={profileView} setProfileView={setProfileView} />

            {profileView && <Profile setProfileView={setProfileView} />}

            <Routes>
                <Route path="/" element={<Home onOnePieceDleClick={handleOnePieceDleClick} onOneDokuClick={handleOneDokuClick} onMapClick={handleEastBlueMapClick} />} />

                <Route path="/login" element={logic.isUserLoggedIn() && logic.isUserRoleRegular() ? <Navigate to="/" /> : <Login onLoggedIn={handleUserLoggedIn} onRegisterAnchorClick={handleRegisterAnchorClick} />} />

                <Route path="/register" element={logic.isUserLoggedIn() && logic.isUserRoleRegular() ? <Navigate to="/" /> : <Register onLoginAnchorClick={handleLoginAnchorClick} onRegistered={handleUserRegistered} />} />

                <Route path="/onepiecedle" element={logic.isUserLoggedIn() ? <OnePieceDle onHomeClick={handleHomeClick} onLoginClick={handleLoginClick} onRegisterClick={handleRegisterClick} /> : <Navigate to="/" />} />

                <Route path="/onedoku" element={logic.isUserLoggedIn() ? <OneDoku onHomeClick={handleHomeClick} onLoginClick={handleLoginClick} onRegisterClick={handleRegisterClick} /> : <Navigate to="/" />} />

                <Route path="/eastblue" element={logic.isUserLoggedIn() ? <EastBlueMap onHomeClick={handleHomeClick} onLoginClick={handleLoginClick} onRegisterClick={handleRegisterClick} /> : <Navigate to="/" />} />
            </Routes>

            {location.pathname !== '/login' && location.pathname !== '/register' && !logic.isUserLoggedIn() && <NoUserLoggedInAlert asGuest={handlePlayAsGuestClick} onLoginClick={handleLoginClick} onRegisterClick={handleRegisterClick} />}

            {alert.message && <Alert message={alert.message} level={alert.level} onAccepted={handleAlertAccepted} />}

            {confirm.message && <Confirm message={confirm.message} level={confirm.level} onAccepted={handleConfirmAccepted} onCancelled={handleConfirmCancelled} />}
        </main>
    </Context.Provider>
}