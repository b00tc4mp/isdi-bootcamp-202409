import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, Navigate, useLocation } from 'react-router-dom'
import { Login, Register } from './view'
import { Header, Alert, Confirm, Footer, Spinner } from './view/components'
import { Profile, People, Chat, Settings } from './view/pages'
import { NameDOBStage, GenderStage, ArtistsStage } from './view/setup'
import { Context } from './view/useContext'
import logic from './logic'
import { disconnectSocket } from './socket'

const VALID_STAGES = ['name-dob', 'gender', 'artists', 'completed']

export default function App() {
    const [alert, setAlert] = useState({ message: null, title: null, level: 'error' })
    const [confirm, setConfirm] = useState({ message: null, title: null, level: 'error', callback: null })
    const [userStage, setUserStage] = useState(null)
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
            setUserStage(null) // If user logs out, or we detect they are not logged in, reset userStage to null
        }
        return () => { isMounted = false }
    }, [userLoggedIn]) // Added as a dependency to rerun this effect when login status changes

    // Store previous page when navigating to settings
    useEffect(() => {
        if (location.pathname !== '/settings' &&
            !location.pathname.includes('/login') &&
            !location.pathname.includes('/register') &&
            !location.pathname.includes('/setup/')) {
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
        const stageToSet = VALID_STAGES.includes(nextStage) ? nextStage : 'name-dob' // Validate nextStage before setting
        logic.updateUserStage(stageToSet)
            .then(() => {
                setUserStage(stageToSet)
                // Navigate to profile page only when setup transitions to 'completed'
                // If already 'completed', this prevents unnecessary navigation
                if (stageToSet === 'completed' && userStage !== 'completed') {
                    navigate('/people')
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

    // Prevents stage skipping
    const renderSetupStage = (stage, Component, nextStage) => {
        if (userStage === null) return <div className="flex justify-center items-center pt-20">Loading setup stage...</div>
        // if the current userStage matches the requested stage, render the component with callbacks
        if (userStage === stage) {
            const props = {
                onSetupComplete: () => handleSetupComplete(nextStage)
            }
            return <Component {...props} />
        }
        // Redirect to the correct current stage if the URL doesn't match
        return <Navigate to={`/setup/${userStage}`} />
    }

    const handleUserLoggedIn = () => {
        // Fetch stage after login before navigating
        logic.getUserStage()
            .then(stage => {
                const isValidStage = stage && VALID_STAGES.includes(stage)
                const currentStage = isValidStage ? stage : 'name-dob'
                setUserStage(currentStage)
                if (currentStage === 'completed') {
                    navigate('/people')
                } else {
                    navigate(`/setup/${currentStage}`)
                }
            })
            .catch(error => {
                console.error(error)
                setAlert({ message: 'Could not retrieve user status. Please try again.', level: 'error' })
            })
    }
    const handleRegisterClick = () => navigate('/register')
    const handleLoginClick = () => navigate('/login')
    const handleUserRegistered = () => navigate('/login')
    const handleSettingsClick = () => navigate('/settings')
    const handleChatClick = () => navigate('/chat')
    const handleBackFromSettings = () => navigate(previousPage)

    // Determine if Footer should be shown (only when setup is complete and logged in)
    const showFooter = userLoggedIn && userStage === 'completed'

    return (
        <Context.Provider value={{
            alert(message = null, level = 'error', title = null) { setAlert({ message, level, title }) },
            confirm(message = null, callback, level = 'error', title = null) { setConfirm({ message, callback, level, title }) }
        }}>

            <div className="flex flex-col h-screen"> {/* Main flex container */}
                <Header
                    onLoggedOut={() => { logic.logoutUser(); disconnectSocket(); setUserStage(null); navigate('/login') }}
                    onSettingsClick={handleSettingsClick}
                    onBackFromSettings={handleBackFromSettings}
                />

                <main className="flex-grow overflow-auto"> {/* Main content area */}
                    <Routes>
                        {!userLoggedIn ? (
                            <>
                                <Route path="/login" element={<Login onLoggedIn={handleUserLoggedIn} onRegisterClick={handleRegisterClick} />} />
                                <Route path="/register" element={<Register onLoginClick={handleLoginClick} onRegistered={handleUserRegistered} />} />
                                <Route path="*" element={<Navigate to="/login" />} />
                            </>
                        ) : userStage === null ? (
                            // Logged in but userStage is null
                            <Route path="*" element={<Spinner />} />
                        ) : userStage !== 'completed' ? (
                            // Logged in and setup not completed
                            <>
                                <Route path="/setup/name-dob" element={renderSetupStage('name-dob', NameDOBStage, 'gender')} />
                                <Route path="/setup/gender" element={renderSetupStage('gender', GenderStage, 'artists')} />
                                <Route path="/setup/artists" element={renderSetupStage('artists', ArtistsStage, 'completed')} />
                                <Route path="*" element={<Navigate to={`/setup/${userStage}`} />} />
                            </>
                        ) : (
                            // Logged in and setup complete routes
                            <>
                                <Route path="/settings" element={<Settings />} />
                                <Route path="/profile" element={<Profile />} />
                                <Route path="/people" element={<People onSettingsClick={handleSettingsClick} />} />
                                <Route path="/chat" element={<Chat />} />
                                <Route path="/chat/:matchId" element={<Chat onChatClick={handleChatClick} />} />
                                <Route path="/" element={<Navigate to="/people" />} />
                                <Route path="*" element={<Navigate to="/people" />} />
                            </>
                        )}
                    </Routes>
                </main>

                {showFooter && <Footer />}
            </div>

            {/* Alert and Confirm Modals */}
            {(alert.message || alert.title) && <Alert message={alert.message} title={alert.title} level={alert.level} onAccepted={handleAlertAccepted} />}
            {(confirm.message || confirm.title) && <Confirm message={confirm.message} title={confirm.title} level={confirm.level} onAccepted={handleConfirmAccepted} onCancelled={handleConfirmCancelled} />}
        </Context.Provider>
    )
}