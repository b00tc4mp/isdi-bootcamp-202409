import { useState } from 'react'

import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'

import { Login, Register, Home, Search, Explorer, Appointments, Profile } from './view'
import { Alert } from './view/components'
import { Context } from './view/useContext'
import { Footer } from './view/components/Footer.jsx'
import { Header } from './view/components/Header.jsx'
import { NoProfile } from './view/ExtraPages/NoProfile.jsx'
import { NoAppointments } from './view/ExtraPages/NoAppointments.jsx'
//import { Confirm } from './view/components/Confirm.jsx'

import logic from './logic/'

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

    //const handlePostCreated = () => navigate('/')

    const handleUserLoggedOut = () => navigate('/login') 

    const handleUserLoggedIn = () => navigate('/')

    const handleRegisterClick = () => navigate('/register')

    const handleLoginClick = () => navigate('/login')

    const handleUserRegistered = () => navigate('/') //modifico de login a home

    const handleHomeClick = () => navigate('/')

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
            <Route path="/login" element= {<Login onLoggedIn={handleUserLoggedIn} onRegisterClick={handleRegisterClick} />} /> //modifico esta línea

            <Route path="/register" element={ <Register onLoginClick={handleLoginClick} onRegistered={handleUserRegistered} />} /> 

            <Route path="/" element={logic.isUserLoggedIn() ? <Home onLoginClick={handleLoginClick}/> : <Navigate to="/login" />} /> //modifico a home, quiero que sea opcional

            <Route path="/home" element={logic.isUserLoggedIn() ? <Home /> : <Navigate to="/" />} />

            <Route path="/explorer" element={logic.isUserLoggedIn() ? <Explorer /> : <Navigate to="/login" />} />

            <Route path="/appointments" element={logic.isUserLoggedIn() ? <Appointments /> : <Navigate to="/login" />} />

            <Route path="/profile" element={logic.isUserLoggedIn() ? <Profile /> : <Navigate to="/login" />} />
            <Route path="/appointments" element={logic.isUserLoggedIn() ? <Appointments /> : <NoAppointments />} />
            <Route path="/profile" element={logic.isUserLoggedIn() ? <Profile /> : <NoProfile />} />
            
            {/* rutas redundantes */}
            <Route path="/" element={logic.isUserLoggedIn() ? <Home /> : <Navigate to="/login" />} />
            <Route path="/home" element={<Navigate to="/" />} />

            {/* extra demos */}
            {/*<Route path="/hello/:name" element={<Hello />} /> */}
            <Route path="/search" element={<Search />} />
            <Route path="/profile/:userId/*" element={<Profile />} /> 
        </Routes>

        {alert.message && <Alert message={alert.message} level={alert.level} onAccepted={handleAlertAccepted} />}

        {confirm.message && <Confirm message={confirm.message} level={confirm.level} onAccepted={handleConfirmAccepted} onCancelled={handleConfirmCancelled} />}
        {logic.isUserLoggedIn() && <Footer />}
    </Context.Provider>
    
}
