import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'

import { Login, Register, Home } from './view'
import { Header, Alert, Confirm } from './view/components'
import { NameDOBStage, GenderStage } from './view/setup'
import { Context } from './view/useContext'
import logic from './logic'

export default function App() {
    const [alert, setAlert] = useState({ message: null, level: 'error' })
    const [confirm, setConfirm] = useState({ message: null, level: 'error', callback: null })
    const [userStage, setUserStage] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        if (logic.isUserLoggedIn()) {
            logic.getUserStage()
                .then(stage => setUserStage(stage || 'name-dob'))
                .catch(error => {
                    console.error(error)
                    setAlert({ message: 'Failed to fetch setup stage. Please try again.', level: 'error' })
                })
        } else {
            setUserStage(null) // if user logs out, or we detect they are not logged in, reset userStage to null
        }
    }, [logic.isUserLoggedIn()]) // added as a dependency to rerun this effect when login status changes

    const handleSetupComplete = async nextStage => {
        try {
            await logic.updateUserStage(nextStage)
            setUserStage(nextStage)
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
        if (userStage === null) return <div>Loading setup stage...</div> // if userStage is not loaded yet, show a loading state
        if (userStage === stage) return <Component onSetupComplete={() => handleSetupComplete(nextStage)} /> // if the current userStage matches the requested stage, render the component with a callback
        if (['name-dob', 'gender', 'artists', 'completed'].includes(userStage)) { // if userStage is one of these known valid stages, navigate to its route
            return <Navigate to={`/setup/${userStage}`} />
        }

        setUserStage('name-dob'); // if userStage is somehow invalid, force set it to 'name-dob'
        return <Navigate to="/setup/name-dob" />
    }

    console.log('App -> render')

    const handleUserLoggedIn = () => navigate('/')
    const handleRegisterClick = () => navigate('/register')
    const handleLoginClick = () => navigate('/login')
    const handleUserRegistered = () => navigate('/login')

    return (
        <Context.Provider value={{
            alert(message, level = 'error') { setAlert({ message, level }) },
            confirm(message, callback, level = 'error') { setConfirm({ message, callback, level }) }
        }}>

            <Header onLoggedOut={() => navigate('/login')} />

            {!logic.isUserLoggedIn() ? (
                // if not logged in, show login/register routes
                <Routes>
                    <Route
                        path="/login"
                        element={<Login onLoggedIn={handleUserLoggedIn} onRegisterClick={handleRegisterClick} />}
                    />
                    <Route
                        path="/register"
                        element={<Register onLoginClick={handleLoginClick} onRegistered={handleUserRegistered} />}
                    />
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            ) : userStage === null ? (
                // if logged in but userStage is null, show a loading spinner
                <div>Loading user data...</div>
            ) : (
                // if logged in and userStage known, show the appropriate setup or home route
                <Routes>
                    <Route path="/" element={userStage === 'completed' ? <Home /> : <Navigate to={`/setup/${userStage}`} />} />
                    <Route path="/setup/name-dob" element={renderSetupStage('name-dob', NameDOBStage, 'gender')} />
                    <Route path="/setup/gender" element={renderSetupStage('gender', GenderStage, 'artists')} />

                    {/* <Route path="/setup/artists" element={renderSetupStage('artists', ArtistsStage, 'completed')} /> */}

                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            )}

            {alert.message && <Alert message={alert.message} level={alert.level} onAccepted={handleAlertAccepted} />}
            {confirm.message && <Confirm message={confirm.message} level={confirm.level} onAccepted={handleConfirmAccepted} onCancelled={handleConfirmCancelled} />}
        </Context.Provider>
    )
}