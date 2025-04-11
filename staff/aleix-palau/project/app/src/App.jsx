import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, Navigate, useLocation, Outlet } from 'react-router-dom'
import { Login, Register } from './view'
import { Header, Alert, Confirm, Footer } from './view/components'
import { Profile, People, Chat, Settings } from './view/pages'
import { NameDOBStage, GenderStage, ArtistsStage } from './view/setup'
import { Context } from './view/useContext'
import logic from './logic'
import { disconnectSocket } from './socket'

const VALID_STAGES = ['name-dob', 'gender', 'artists', 'completed']

// Simple layout component that adds the Footer
function MainLayout() {
    return (
        <div className="flex flex-col h-screen">
            <main className="flex-grow overflow-auto">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default function App() {
    const [alert, setAlert] = useState({ message: null, title: null, level: 'error' })
    const [confirm, setConfirm] = useState({ message: null, title: null, level: 'error', callback: null })
    const [userStage, setUserStage] = useState(null)
    // We'll store the previous page before going to settings
    const [previousPage, setPreviousPage] = useState('/people')

    const navigate = useNavigate()
    const location = useLocation()
    const userLoggedIn = logic.isUserLoggedIn()

    useEffect(() => {
        let isMounted = true

        if (userLoggedIn) {
            logic.getUserStage()
                .then(stage => {
                    if (isMounted) {
                        const isValidStage = stage && VALID_STAGES.includes(stage)
                        setUserStage(isValidStage ? stage : 'name-dob')
                    }
                })
                .catch(error => {
                    if (isMounted) {
                        console.error(error)
                        setAlert({ message: 'Failed to fetch setup stage. Please try again.', level: 'error' })
                    }
                })
        } else {
            setUserStage(null) // if user logs out, or we detect they are not logged in, reset userStage to null
        }
        return () => {
            isMounted = false
        }
    }, [userLoggedIn]) // added as a dependency to rerun this effect when login status changes

    // Store previous page when navigating to settings
    useEffect(() => {
        if (location.pathname !== '/settings' &&
            !location.pathname.includes('/login') &&
            !location.pathname.includes('/register') &&
            !location.pathname.includes('/setup')) {
            setPreviousPage(location.pathname)
        }
    }, [location.pathname])

    // Cleanup socket connection on unmount
    useEffect(() => {
        return () => {
            disconnectSocket()
        }
    }, [])

    const handleSetupComplete = nextStage => {
        const stageToSet = VALID_STAGES.includes(nextStage) ? nextStage : 'name-dob' // validate nextStage before setting

        logic.updateUserStage(stageToSet)
            .then(() => {
                setUserStage(stageToSet)
                if (stageToSet === 'completed') {
                    navigate('/profile') // Navigate to profile page when setup is complete
                }
            })
            .catch(error => {
                console.error(error)
                setAlert({ message: 'Failed to update setup stage. Please try again.', level: 'error' })
            })
    }

    const handleAlertAccepted = () => setAlert({ message: null, title: null, level: 'error' })

    const handleConfirmAccepted = () => {
        // Store callback in a variable before resetting state to ensure it exists when called.
        // This prevents potential race conditions where the callback might be null when executed.
        const callback = confirm.callback
        setConfirm({ message: null, title: null, level: 'error', callback: null })
        if (callback) callback(true)
    }

    const handleConfirmCancelled = () => {
        const callback = confirm.callback
        setConfirm({ message: null, title: null, level: 'error', callback: null })
        if (callback) callback(false)
    }

    // Since we always ensure userStage is valid or null when setting it,
    // we don't need to fix it in renderSetupStage anymore.
    // prevents stage skipping
    const renderSetupStage = (stage, Component, nextStage) => {
        // if userStage is not loaded yet, show a loading state
        if (userStage === null) return <div>Loading setup stage...</div>

        // if the current userStage matches the requested stage, render the component with callbacks
        if (userStage === stage) {
            const props = {
                onSetupComplete: () => handleSetupComplete(nextStage)
            }
            return <Component {...props} />
        }
        // if userStage differs from the requested one, redirect to userStage
        return <Navigate to={`/setup/${userStage}`} />
    }

    const handleUserLoggedIn = () => navigate('/people')
    const handleRegisterClick = () => navigate('/register')
    const handleLoginClick = () => navigate('/login')
    const handleUserRegistered = () => navigate('/login')
    const handleSettingsClick = () => navigate('/settings')
    const handleBackFromSettings = () => navigate(previousPage)

    return (
        <Context.Provider value={{
            alert(message = null, level = 'error', title = null) { setAlert({ message, level, title }) },
            confirm(message = null, callback, level = 'error', title = null) { setConfirm({ message, callback, level, title }) }
        }}>

            <Header
                onLoggedOut={() => navigate('/login')} onSettingsClick={handleSettingsClick} onBackFromSettings={handleBackFromSettings} />

            {!userLoggedIn ? (
                // if not logged in, show login/register routes
                <Routes>
                    <Route path="/login" element={<Login onLoggedIn={handleUserLoggedIn} onRegisterClick={handleRegisterClick} />} />
                    <Route path="/register" element={<Register onLoginClick={handleLoginClick} onRegistered={handleUserRegistered} />} />
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            ) : userStage === null ? (
                // if logged in but userStage is null, show a loading spinner
                <div className="flex justify-center items-center mt-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                    <span className="ml-2">Loading user data...</span>
                </div>
            ) : userStage !== 'completed' ? (
                // if logged in and setup not completed, show setup routes
                <Routes>
                    <Route path="/setup/name-dob" element={renderSetupStage('name-dob', NameDOBStage, 'gender')} />
                    <Route path="/setup/gender" element={renderSetupStage('gender', GenderStage, 'artists')} />
                    <Route path="/setup/artists" element={renderSetupStage('artists', ArtistsStage, 'completed')} />
                    <Route path="*" element={<Navigate to={`/setup/${userStage}`} />} />
                </Routes>
            ) : (
                // if logged in and setup completed, show main application routes with footer
                <Routes>
                    <Route element={<MainLayout />}>
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/people" element={<People onSettingsClick={handleSettingsClick} />} />
                        <Route path="/chat" element={<Chat />} />
                        <Route path="/chat/:matchId" element={<Chat />} />
                        <Route path="/" element={<Navigate to="/people" />} />
                        <Route path="*" element={<Navigate to="/people" />} />
                    </Route>
                </Routes>
            )}

            {(alert.message || alert.title) && <Alert message={alert.message} title={alert.title} level={alert.level} onAccepted={handleAlertAccepted} />}
            {(confirm.message || confirm.title) && <Confirm message={confirm.message} title={confirm.title} level={confirm.level} onAccepted={handleConfirmAccepted} onCancelled={handleConfirmCancelled} />}
        </Context.Provider>
    )
}