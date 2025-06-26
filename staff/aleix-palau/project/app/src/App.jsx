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
    const [activeMatchNotification, setActiveMatchNotification] = useState(null)

    const navigate = useNavigate()
    const location = useLocation()
    const { registerMatchListener, pendingMatchNotificationsQueue, markAndDequeueMatchNotification } = useNotifications()

    // Auth status monitoring
    useEffect(() => {
        const checkLoginStatus = () => {
            const loggedInStatus = logic.isUserLoggedIn()
            if (loggedInStatus !== isLoggedIn) {
                setIsLoggedIn(loggedInStatus)
                if (!loggedInStatus) {
                    setUserStage(null)
                    setIsLoading(false)
                }
            }
        }

        checkLoginStatus()
        document.addEventListener('authChange', checkLoginStatus)
        return () => document.removeEventListener('authChange', checkLoginStatus)
    }, [isLoggedIn])

    // User stage loading
    useEffect(() => {
        if (!isLoggedIn) {
            setUserStage(null)
            setIsLoading(false)
            return
        }

        setIsLoading(true)
        logic.getUserStage()
            .then(stage => {
                setUserStage(VALID_STAGES.includes(stage) ? stage : 'name-dob')
            })
            .catch(error => {
                console.error(error)
                setAlert({ message: 'Failed to fetch setup stage. Please try again.', level: 'error' })
                setUserStage(null)
            })
            .finally(() => setIsLoading(false))
    }, [isLoggedIn])

    // Track previous page for navigation
    useEffect(() => {
        const isMainPage = !location.pathname.includes('/settings') &&
            !location.pathname.includes('/login') &&
            !location.pathname.includes('/register') &&
            !location.pathname.includes('/setup/')

        if (isMainPage) setPreviousPage(location.pathname)
    }, [location.pathname])

    // Real-time match notifications
    useEffect(() => {
        if (!isLoggedIn) {
            setActiveMatchNotification(null) // Clear real-time notification if logged out
            return
        }

        const currentUserId = logic.getUserId()

        const handleNewMatch = matchData => {
            if (!matchData || activeMatchNotification) return

            // Format notification data
            const notification = formatMatchNotification(matchData, currentUserId)
            if (notification) setActiveMatchNotification(notification)
        }

        const unregister = registerMatchListener(handleNewMatch)
        return unregister
    }, [isLoggedIn, registerMatchListener, activeMatchNotification])

    // Process pending match notifications queue
    useEffect(() => {
        if (activeMatchNotification || pendingMatchNotificationsQueue.length === 0) return

        const nextNotification = pendingMatchNotificationsQueue[0]
        setActiveMatchNotification({ ...nextNotification, isOffline: true })
    }, [activeMatchNotification, pendingMatchNotificationsQueue])

    // Notification formatting helper
    const formatMatchNotification = (matchData, currentUserId) => {
        if (matchData.user && matchData.notificationId) {
            return {
                _id: matchData._id,
                notificationId: matchData.notificationId,
                user: matchData.user,
                isOffline: false
            }
        }

        const otherUser = matchData.users?.find(u => u._id?.toString() !== currentUserId?.toString())
        if (!otherUser) return null

        return {
            _id: matchData._id,
            notificationId: matchData.notificationId,
            user: {
                _id: otherUser._id,
                name: otherUser.name,
                profilePicture: otherUser.profilePicture || '/images/default-profile.jpeg'
            },
            isOffline: false
        }
    }

    // --- Handlers ---
    // Unified notification handler
    const handleMatchNotification = async (shouldNavigate) => {
        if (!activeMatchNotification) return

        try {
            const notificationId = activeMatchNotification.isOffline
                ? activeMatchNotification._id
                : activeMatchNotification.notificationId

            if (notificationId)
                await markAndDequeueMatchNotification(notificationId)

            if (shouldNavigate) {
                const matchId = activeMatchNotification.isOffline
                    ? activeMatchNotification.matchId
                    : activeMatchNotification._id

                if (matchId) navigate(`/chat/${matchId}`)
            }
        } catch (error) {
            console.error('Error handling match notification:', error)
        } finally {
            setActiveMatchNotification(null)
        }
    }

    // Navigation handlers
    const handleSetupComplete = nextStage => {
        const stage = VALID_STAGES.includes(nextStage) ? nextStage : 'name-dob'
        setUserStage(stage)
        navigate(stage === 'completed' ? '/people' : `/setup/${stage}`)
    }

    const handleAlertAccepted = () => setAlert({ message: null, title: null, level: 'error' })

    const handleConfirmAction = accepted => {
        const callback = confirm.callback
        setConfirm({ message: null, title: null, level: 'error', callback: null })
        if (callback) callback(accepted)
    }

    const handleLogout = () => {
        logic.logoutUser()
        setIsLoggedIn(false)
        navigate('/login')
    }

    const showFooter = isLoggedIn && userStage === 'completed' && !isLoading

    // --- Render ---
    return (
        <Context.Provider value={{
            alert: (message = null, level = 'error', title = null) => setAlert({ message, level, title }),
            confirm: (message = null, callback, level = 'error', title = null) => setConfirm({ message, callback, level, title })
        }}>
            <div className="flex flex-col h-screen">
                <Header
                    onLoggedOut={handleLogout}
                    onSettingsClick={() => navigate('/settings')}
                    onBackFromSettings={() => navigate(previousPage)}
                />
                <main className="flex-grow overflow-auto">
                    {isLoading || (isLoggedIn && userStage === null) ? (
                        <Spinner />
                    ) : (
                        <Routes>
                            {!isLoggedIn ? (
                                <>
                                    <Route path="/login" element={<Login onLoggedIn={() => setIsLoggedIn(true)} onRegisterClick={() => navigate('/register')} />} />
                                    <Route path="/register" element={<Register onLoginClick={() => navigate('/login')} onRegistered={() => navigate('/login')} />} />
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
                                    <Route path="/people" element={<People onSettingsClick={() => navigate('/settings')} />} />
                                    <Route path="/chat" element={<Chat />} />
                                    <Route path="/chat/:matchId" element={<Chat onChatClick={() => navigate('/chat')} />} />
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
            {(alert.message || alert.title) && (
                <Alert message={alert.message} title={alert.title} level={alert.level} onAccepted={handleAlertAccepted} />
            )}
            {(confirm.message || confirm.title) && (
                <Confirm message={confirm.message} title={confirm.title} level={confirm.level}
                    onAccepted={() => handleConfirmAction(true)}
                    onCancelled={() => handleConfirmAction(false)} />
            )}

            {/* Match Notification */}
            {activeMatchNotification && (
                <MatchNotification
                    match={activeMatchNotification}
                    onClose={() => handleMatchNotification(false)}
                    onStartChat={() => handleMatchNotification(true)}
                    isProcessing={false}
                />
            )}
        </Context.Provider>
    )
}

const renderSetupStage = (stage, Component, nextStage, currentUserStage, onSetupComplete) => {
    if (currentUserStage === null) return <Spinner />
    if (currentUserStage === stage) return <Component onSetupComplete={() => onSetupComplete(nextStage)} />
    return <Navigate to={`/setup/${currentUserStage}`} replace />
}

export default function App() {
    return (
        <NotificationProvider>
            <AppContent />
        </NotificationProvider>
    )
}