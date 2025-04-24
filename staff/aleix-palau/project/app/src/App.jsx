import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, Navigate, useLocation } from 'react-router-dom'
import { Login, Register } from './view'
import { Header, Alert, Confirm, Footer, Spinner, MatchNotification } from './view/components'
import { Profile, People, Chat, Settings } from './view/pages'
import { NameDOBStage, GenderStage, ArtistsStage } from './view/setup'
import { NotificationProvider, useNotifications } from './contexts/NotificationContext'
import { Context } from './view/useContext'
import logic from './logic'

const VALID_STAGES = ['name-dob', 'gender', 'artists', 'completed']

function AppContent() {
    const [alert, setAlert] = useState({ message: null, title: null, level: 'error' })
    const [confirm, setConfirm] = useState({ message: null, title: null, level: 'error', callback: null })
    const [userStage, setUserStage] = useState(null)
    const [previousPage, setPreviousPage] = useState('/people')
    const [isLoading, setIsLoading] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(logic.isUserLoggedIn())
    const [matchToShow, setMatchToShow] = useState(null)

    const navigate = useNavigate()
    const location = useLocation()
    const { registerMatchListener, unregisterMatchListener } = useNotifications()

    useEffect(() => {
        const checkLoginStatus = () => {
            const loggedInStatus = logic.isUserLoggedIn()

            setIsLoggedIn(prevState => {
                if (prevState !== loggedInStatus)
                    return loggedInStatus
                return prevState
            })

            if (!loggedInStatus) {
                setUserStage(null)
                setIsLoading(false)
            }
        }
        checkLoginStatus()

        // Listen for the custom event dispatched by logic.loginUser/logic.logoutUser or by the tokenUpdated listener in socket.js
        const handleAuthChange = () => {
            checkLoginStatus()
        }
        document.addEventListener('authChange', handleAuthChange)

        return () => document.removeEventListener('authChange', handleAuthChange)
    }, [])

    useEffect(() => {
        let isMounted = true
        if (isLoggedIn) {
            setIsLoading(true)
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
                        setUserStage(null)
                    }
                })
                .finally(() => {
                    if (isMounted) setIsLoading(false)
                })
        } else {
            setUserStage(null)
            setIsLoading(false)
        }

        return () => isMounted = false
    }, [isLoggedIn])

    useEffect(() => {
        if (location.pathname !== '/settings' &&
            !location.pathname.includes('/login') &&
            !location.pathname.includes('/register') &&
            !location.pathname.includes('/setup/')) {
            setPreviousPage(location.pathname)
        }
    }, [location.pathname])

    // Effect for Match Listener
    useEffect(() => {
        if (!isLoggedIn) return

        let currentUserId = null
        try {
            currentUserId = logic.getUserId()
        } catch (error) {
            console.error(error)
            return
        }

        const handleRealtimeMatch = newMatchData => {
            if (!currentUserId) return

            // Find the *other* user in the match data
            const otherUser = newMatchData.users?.find(user => user?._id?.toString() !== currentUserId.toString())

            if (otherUser) {
                const notificationData = {
                    _id: newMatchData._id,
                    user: { // The other user's details
                        _id: otherUser._id,
                        name: otherUser.name,
                        profilePicture: otherUser.profilePicture || '/images/default-profile.jpeg'
                    }
                }
                setMatchToShow(notificationData)
            }
        }
        // Register returns the unregister function
        const unregister = registerMatchListener(handleRealtimeMatch)

        // Cleanup function returned by useEffect
        return () => unregister()
    }, [isLoggedIn, registerMatchListener, unregisterMatchListener])

    // --- Handlers ---
    const handleSetupComplete = nextStage => {
        const stageToSet = VALID_STAGES.includes(nextStage) ? nextStage : 'name-dob'
        setUserStage(stageToSet)
        if (stageToSet === 'completed') navigate('/people')
        else navigate(`/setup/${stageToSet}`)
    }

    const handleAlertAccepted = () => setAlert({ message: null, title: null, level: 'error' })

    const handleConfirmAccepted = () => {
        // Store callback in a variable before resetting state to ensure it exists when called. This prevents potential race conditions where the callback might be null when executed.
        const callback = confirm.callback
        setConfirm({ message: null, title: null, level: 'error', callback: null })
        if (callback) callback(true)
    }

    const handleConfirmCancelled = () => {
        const callback = confirm.callback
        setConfirm({ message: null, title: null, level: 'error', callback: null })
        if (callback) callback(false)
    }

    const handleUserLoggedIn = () => setIsLoggedIn(true)

    const handleLogout = () => {
        logic.logoutUser()
        setIsLoggedIn(false)
        navigate('/login')
    }

    const handleStartChatFromNotification = () => {
        if (matchToShow?._id) {
            const matchId = matchToShow._id
            setMatchToShow(null)
            navigate(`/chat/${matchId}`)
        }
    }

    const handleRegisterClick = () => navigate('/register')
    const handleLoginClick = () => navigate('/login')
    const handleUserRegistered = () => navigate('/login')
    const handleSettingsClick = () => navigate('/settings')
    const handleChatClick = () => navigate('/chat')
    const handleBackFromSettings = () => navigate(previousPage)

    const showFooter = isLoggedIn && userStage === 'completed' && !isLoading

    // --- Render ---
    return (
        <Context.Provider value={{
            alert(message = null, level = 'error', title = null) { setAlert({ message, level, title }) },
            confirm(message = null, callback, level = 'error', title = null) { setConfirm({ message, callback, level, title }) }
        }}>
            <div className="flex flex-col h-screen">
                <Header
                    onLoggedOut={handleLogout}
                    onSettingsClick={handleSettingsClick}
                    onBackFromSettings={handleBackFromSettings}
                />
                <main className="flex-grow overflow-auto">
                    {isLoggedIn && isLoading ? (
                        <Spinner />
                    ) : (
                        <Routes>
                            {!isLoggedIn ? (
                                <>
                                    <Route path="/login" element={<Login onLoggedIn={handleUserLoggedIn} onRegisterClick={handleRegisterClick} />} />
                                    <Route path="/register" element={<Register onLoginClick={handleLoginClick} onRegistered={handleUserRegistered} />} />
                                    <Route path="*" element={<Navigate to="/login" replace />} />
                                </>
                            ) : userStage !== 'completed' ? (
                                <>
                                    <Route path="/setup/name-dob" element={renderSetupStage('name-dob', NameDOBStage, 'gender', userStage, handleSetupComplete)} />
                                    <Route path="/setup/gender" element={renderSetupStage('gender', GenderStage, 'artists', userStage, handleSetupComplete)} />
                                    <Route path="/setup/artists" element={renderSetupStage('artists', ArtistsStage, 'completed', userStage, handleSetupComplete)} />
                                    <Route path="*" element={<Navigate to={`/setup/${userStage || 'name-dob'}`} replace />} />
                                </>
                            ) : (
                                <>
                                    <Route path="/settings" element={<Settings />} />
                                    <Route path="/profile" element={<Profile />} />
                                    <Route path="/people" element={<People onSettingsClick={handleSettingsClick} />} />
                                    <Route path="/chat" element={<Chat />} />
                                    <Route path="/chat/:matchId" element={<Chat onChatClick={handleChatClick} />} />
                                    <Route path="/" element={<Navigate to="/people" replace />} />
                                    <Route path="*" element={<Navigate to="/people" replace />} />
                                </>
                            )}
                        </Routes>
                    )}
                </main>
                {showFooter && <Footer />}
            </div>

            {/* Alert and Confirm Modals */}
            {(alert.message || alert.title) && <Alert message={alert.message} title={alert.title} level={alert.level} onAccepted={handleAlertAccepted} />}
            {(confirm.message || confirm.title) && <Confirm message={confirm.message} title={confirm.title} level={confirm.level} onAccepted={handleConfirmAccepted} onCancelled={handleConfirmCancelled} />}

            {/* Match Notification */}
            {matchToShow && (
                <MatchNotification
                    match={matchToShow}
                    onClose={() => setMatchToShow(null)}
                    onStartChat={handleStartChatFromNotification}
                />
            )}
        </Context.Provider>
    )
}

const renderSetupStage = (stage, Component, nextStage, currentUserStage, onSetupComplete) => {
    if (currentUserStage === null) {
        return <Spinner />
    }
    if (currentUserStage === stage) {
        return <Component onSetupComplete={() => onSetupComplete(nextStage)} />
    }
    return <Navigate to={`/setup/${currentUserStage}`} replace />
}

export default function App() {
    return (
        <NotificationProvider>
            <AppContent />
        </NotificationProvider>
    )
}