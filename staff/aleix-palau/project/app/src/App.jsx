import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'

import { Login, Register, Home } from './view'
import { Header, Alert, Confirm } from './view/components'
import { NameDOBStage } from './view/setup'
import { Context } from './view/useContext'
import logic from './logic'

export default function App() {
    const [alert, setAlert] = useState({ message: null, level: 'error' })
    const [confirm, setConfirm] = useState({ message: null, level: 'error', callback: null })
    const [userStage, setUserStage] = useState('name-dob') // Tracks user stage

    const navigate = useNavigate()

    useEffect(() => {
        if (logic.isUserLoggedIn()) {
            logic.getUserStage()
                .then(stage => {
                    setUserStage(stage)

                    if (stage === 'completed')
                        navigate('/')
                    else
                        navigate(`/setup/${stage}`)
                })
                .catch(error => {
                    console.error(error)
                    setAlert({ message: 'Failed to fetch setup stage. Please try again.', level: 'error' })
                })
        }
    }, [])

    if (!'name-dob')
        return <div>Loading...</div>

    const handleSetupComplete = async nextStage => {
        try {
            await logic.updateUserStage(nextStage)
            setUserStage(nextStage)

            if (nextStage === 'completed')
                navigate('/')
            else
                navigate(`/setup/${nextStage}`)
        } catch (error) {
            console.error(error)
            setAlert({ message: 'Failed to update setup stage. Please try again.', level: 'error' })
        }
    }

    const handleAlertAccepted = () => setAlert({ message: null, level: 'error' })

    const handleConfirmAccepted = () => {
        confirm.callback(true)
        setConfirm({ message: null, level: 'error', callback: null })
    }

    const handleConfirmCancelled = () => {
        confirm.callback(false)
        setConfirm({ message: null, level: 'error', callback: null })
    }

    // semiútil quan es pugui editar la info del setup al perfil de cada usuari
    // prevents stage skipping
    const renderSetupStage = (stage, Component, nextStage) => {
        if (!logic.isUserLoggedIn())
            return <Navigate to="/login" />
        if (userStage === stage)
            return <Component onSetupComplete={() => handleSetupComplete(nextStage)} />
        return <Navigate to={`/setup/${userStage}`} />
    }

    console.log('App -> render')

    const handleUserLoggedIn = () => navigate('/')

    // const handleUserLoggedOut = () => navigate('/login')

    const handleRegisterClick = () => navigate('/register')

    const handleLoginClick = () => navigate('./login')

    const handleUserRegistered = () => navigate('/login') // /setup

    // const handleHomeClick = () => navigate('/')

    return <Context.Provider value={{
        alert(message, level = 'error') { setAlert({ message, level }) },
        confirm(message, callback, level = 'error') { setConfirm({ message, callback, level }) }
    }}>

        <Header onLoggedOut={() => navigate('/login')} />

        <Routes>
            <Route path="/login" element={logic.isUserLoggedIn() ? <Navigate to="/setup/name-dob" /> : <Login onLoggedIn={handleUserLoggedIn} onRegisterClick={handleRegisterClick} />} />
            <Route path="/register" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Register onLoginClick={handleLoginClick} onRegistered={handleUserRegistered} />} />
            <Route path="/" element={logic.isUserLoggedIn() && userStage === 'completed' ? <Home /> : <Navigate to="/login" />} />

            <Route path="/setup/name-dob" element={renderSetupStage('name-dob', NameDOBStage, 'gender')} />

            {/* <Route path="/setup/gender" element={renderSetupStage('gender', GenderStage, 'genres')} />
                <Route path="/setup/genres" element={renderSetupStage('genres', GenresStage, 'artists')} />
                <Route path="/setup/artists" element={renderSetupStage('artists', ArtistsStage, 'photos')} /> */}
        </Routes>

        {alert.message && <Alert message={alert.message} level={alert.level} onAccepted={handleAlertAccepted} />}
        {confirm.message && <Confirm message={confirm.message} level={confirm.level} onAccepted={handleConfirmAccepted} onCancelled={handleConfirmCancelled} />}
    </Context.Provider >
}