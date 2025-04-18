import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, Navigate, useLocation } from 'react-router-dom'
import { Login, Register } from './view'
import { Header, Alert, Confirm, Footer, Spinner, MatchNotification } from './view/components'
import { Profile, People, Chat, Settings } from './view/pages'
import { NameDOBStage, GenderStage, ArtistsStage } from './view/setup'
import { NotificationProvider, useNotifications } from './contexts/NotificationContext' // Only Provider needed here
import { Context } from './view/useContext'
import logic from './logic'
// Removed socket imports - handled by context

const VALID_STAGES = ['name-dob', 'gender', 'artists', 'completed']

function AppContent() {
    const [alert, setAlert] = useState({ message: null, title: null, level: 'error' })
    const [confirm, setConfirm] = useState({ message: null, title: null, level: 'error', callback: null })
    const [userStage, setUserStage] = useState(null)
    const [previousPage, setPreviousPage] = useState('/people')
    const [isLoadingStage, setIsLoadingStage] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(logic.isUserLoggedIn()) // Local state reflecting login status
    const [matchToShow, setMatchToShow] = useState(null); // Holds data for MatchNotification

    const navigate = useNavigate()
    const location = useLocation()
    const { registerMatchListener, unregisterMatchListener } = useNotifications();

    // Effect to monitor login state changes locally
    useEffect(() => {
        // This effect primarily serves to update the local `isLoggedIn` state,
        // which drives the routing logic. The NotificationContext handles its
        // own reaction to the login status change internally.
        const checkLoginStatus = () => {
            const loggedInStatus = logic.isUserLoggedIn()
            setIsLoggedIn(loggedInStatus)
            if (!loggedInStatus) {
                // If user is logged out, ensure stage is cleared
                setUserStage(null)
                setIsLoadingStage(false) // No stage to load if logged out
            }
        }

        // Check immediately and potentially set up listeners if your logic layer
        // has events for login/logout. For simplicity, checking periodically or
        // relying on handleUserLoggedIn/handleLogout is common.
        checkLoginStatus()

        // Example: If logic emits events (Optional)
        // logic.on('loginStateChange', checkLoginStatus)
        // return () => logic.off('loginStateChange', checkLoginStatus)

    }, []) // Runs once on mount, or add dependencies if needed


    // Effect to fetch user stage when login status changes to logged in
    useEffect(() => {
        let isMounted = true
        if (isLoggedIn) {
            setIsLoadingStage(true)
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
                        setUserStage(null) // Set stage to null on error
                    }
                })
                .finally(() => {
                    if (isMounted) setIsLoadingStage(false)
                })
        } else {
            // Handled by the checkLoginStatus effect or initial state
            setUserStage(null)
            setIsLoadingStage(false)
        }
        return () => { isMounted = false }
    }, [isLoggedIn]) // Rerun only when isLoggedIn state changes

    // Store previous page - unchanged
    useEffect(() => {
        if (location.pathname !== '/settings' &&
            !location.pathname.includes('/login') &&
            !location.pathname.includes('/register') &&
            !location.pathname.includes('/setup/')) {
            setPreviousPage(location.pathname)
        }
    }, [location.pathname])

    // --- Add useEffect for Match Listener ---
    useEffect(() => {
        // Only register if the user is logged in
        if (!isLoggedIn) return;

        const currentUserId = logic.getUserId(); // Need this to find the *other* user

        // Define the listener function
        const handleRealtimeMatch = (newMatchData) => {
            console.log('AppContent received real-time match:', newMatchData);

            // Find the *other* user in the match data
            const otherUser = newMatchData.users?.find(user => user._id.toString() !== currentUserId.toString());

            if (otherUser) {
                // Prepare data structure expected by MatchNotification
                const notificationData = {
                    _id: newMatchData._id, // The ID of the match itself
                    user: { // The *other* user's details
                        _id: otherUser._id,
                        name: otherUser.name, // Make sure 'name' and 'pictures' are populated in the event payload
                        pictures: otherUser.pictures || [], // Handle potential missing pictures array
                    }
                };
                console.log('Setting match notification data:', notificationData);
                setMatchToShow(notificationData);
            } else {
                console.warn("Could not determine the other user in the received match data.", newMatchData);
            }
        };

        // Register the listener
        registerMatchListener(handleRealtimeMatch);
        console.log('Registered match listener in AppContent.');

        // Unregister on cleanup or when user logs out
        return () => {
            unregisterMatchListener(handleRealtimeMatch);
            console.log('Unregistered match listener in AppContent.');
        };
        // Rerun if login state changes or registration functions change (should be stable)
    }, [isLoggedIn, registerMatchListener, unregisterMatchListener]);
    // --- End Match Listener Effect ---

    // --- Handlers ---
    const handleSetupComplete = nextStage => {
        const stageToSet = VALID_STAGES.includes(nextStage) ? nextStage : 'name-dob'
        setUserStage(stageToSet)
        if (stageToSet === 'completed') navigate('/people')
        else navigate(`/setup/${stageToSet}`)
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
    const handleUserLoggedIn = () => {
        setIsLoggedIn(true) // Update local state, triggering stage fetch effect
        // NotificationContext will detect the login change internally
        console.log("Login successful, triggering stage check...")
        // Navigation will happen based on the stage fetched in the useEffect
    }

    const handleLogout = () => {
        logic.logoutUser()
        setIsLoggedIn(false) // Update local state
        // NotificationContext will detect the logout change internally
        navigate('/login')
    }

    // --- Add Handler for Starting Chat from Notification ---
    const handleStartChatFromNotification = () => {
        if (matchToShow && matchToShow._id) {
            const matchId = matchToShow._id;
            setMatchToShow(null); // Close notification first
            navigate(`/chat/${matchId}`); // Navigate to the chat
        }
    };
    // --- End Handler ---

    // Other handlers (navigate, etc.) - unchanged
    const handleRegisterClick = () => navigate('/register')
    const handleLoginClick = () => navigate('/login')
    const handleUserRegistered = () => navigate('/login')
    const handleSettingsClick = () => navigate('/settings')
    const handleChatClick = () => navigate('/chat')
    const handleBackFromSettings = () => navigate(previousPage)

    const showFooter = isLoggedIn && userStage === 'completed' && !isLoadingStage

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
                    {isLoadingStage && isLoggedIn ? ( // Show spinner only if loading *while* logged in
                        <Spinner />
                    ) : (
                        <Routes>
                            {!isLoggedIn ? ( // Use local isLoggedIn state for routing
                                <>
                                    <Route path="/login" element={<Login onLoggedIn={handleUserLoggedIn} onRegisterClick={handleRegisterClick} />} />
                                    <Route path="/register" element={<Register onLoginClick={handleLoginClick} onRegistered={handleUserRegistered} />} />
                                    <Route path="*" element={<Navigate to="/login" />} />
                                </>
                            ) : userStage !== 'completed' ? (
                                // Logged in but setup not completed
                                <>
                                    {/* Pass userStage directly, renderSetupStage handles null/invalid */}
                                    <Route path="/setup/name-dob" element={renderSetupStage('name-dob', NameDOBStage, 'gender', userStage, handleSetupComplete)} />
                                    <Route path="/setup/gender" element={renderSetupStage('gender', GenderStage, 'artists', userStage, handleSetupComplete)} />
                                    <Route path="/setup/artists" element={renderSetupStage('artists', ArtistsStage, 'completed', userStage, handleSetupComplete)} />
                                    {/* Redirect logic remains the same, relies on fetched userStage */}
                                    <Route path="*" element={<Navigate to={`/setup/${userStage || 'name-dob'}`} replace />} />
                                </>
                            ) : (
                                // Logged in and setup complete routes
                                <>
                                    {/* ... routes unchanged ... */}
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
                    )}
                </main>
                {showFooter && <Footer />}
            </div>

            {/* Alert and Confirm Modals */}
            {(alert.message || alert.title) && <Alert message={alert.message} title={alert.title} level={alert.level} onAccepted={handleAlertAccepted} />}
            {(confirm.message || confirm.title) && <Confirm message={confirm.message} title={confirm.title} level={confirm.level} onAccepted={handleConfirmAccepted} onCancelled={handleConfirmCancelled} />}

            {/* --- Render Match Notification Conditionally --- */}
            {matchToShow && (
                <MatchNotification
                    match={matchToShow} // Pass the prepared data
                    onClose={() => setMatchToShow(null)} // Close handler
                    onStartChat={handleStartChatFromNotification} // Start chat handler
                />
            )}
            {/* --- End Match Notification --- */}
        </Context.Provider>
    )
}

// renderSetupStage helper - unchanged
const renderSetupStage = (stage, Component, nextStage, currentUserStage, onSetupComplete) => {
    // Redirect immediately if currentUserStage hasn't loaded yet but user is logged in
    if (currentUserStage === null) {
        // Or show a spinner within the stage route wrapper
        return <Spinner />
    }
    if (currentUserStage === stage) {
        return <Component onSetupComplete={() => onSetupComplete(nextStage)} />
    }
    // Redirect to the correct current stage if the URL doesn't match or stage is invalid
    return <Navigate to={`/setup/${currentUserStage || 'name-dob'}`} replace />
}


// Main App export wraps the content with the NotificationProvider - unchanged
export default function App() {
    return (
        <NotificationProvider>
            <AppContent />
        </NotificationProvider>
    )
}