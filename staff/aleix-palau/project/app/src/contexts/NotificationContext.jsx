import { createContext, useState, useEffect, useCallback, useContext } from 'react'
import logic from '../logic'
import { getSocket } from '../socket'
import { useLocation } from 'react-router-dom'

export const NotificationContext = createContext()

export const NotificationProvider = ({ children }) => {
    const [unreadMatches, setUnreadMatches] = useState({}) // Store { matchId: count }
    const [unreadCount, setUnreadCount] = useState(0)
    const [messageListeners] = useState(new Set()) // Store message listeners. Using a Set to avoid duplicate listeners
    const [matchListeners] = useState(new Set())

    const location = useLocation()

    const getCurrentMatchId = useCallback(() => {
        const match = location.pathname.match(/^\/chat\/([a-zA-Z0-9]+)$/)
        return match ? match[1] : null
    }, [location.pathname])

    // --- Listener Registration ---
    const registerMessageListener = useCallback(listener => {
        messageListeners.add(listener)
        return () => messageListeners.delete(listener)
    }, [messageListeners])

    const registerMatchListener = useCallback(listener => {
        matchListeners.add(listener)
        return () => matchListeners.delete(listener)
    }, [matchListeners])

    // --- Data Fetching and State Management ---
    const fetchUnreadData = useCallback(() => {
        if (!logic.isUserLoggedIn()) {
            setUnreadMatches({}) // Ensure state is cleared if called when logged out
            setUnreadCount(0)
            return
        }

        logic.getUnreadNotifications()
            .then(result => {
                if (result && result.matches) {
                    setUnreadMatches(result.matches)
                    // Calculate total count in one place
                    const total = Object.values(result.matches).reduce((sum, count) => sum + count, 0)
                    setUnreadCount(total)
                } else {
                    setUnreadMatches({}) // Reset if result is null/undefined
                    setUnreadCount(0)
                }
            })
            .catch(error => {
                alert(error.message)
                console.error(error)
                setUnreadMatches({})
                setUnreadCount(0)
            })
    }, [])

    const markMatchAsRead = useCallback(matchId => {
        if (!matchId) return

        // Optimistic update
        setUnreadMatches(prev => {
            const newState = { ...prev }
            // Store count before removing for total count update
            const countToRemove = newState[matchId] || 0
            delete newState[matchId]

            // Update total count in single operation
            setUnreadCount(prevCount => Math.max(0, prevCount - countToRemove))

            return newState
        })

        // Server update
        logic.markNotificationsAsRead(matchId)
            .then(() => {
                // console.log('Marked as read on server')
            })
            .catch(error => {
                alert(error.message)
                console.error(error)
                // Revert optimistic update on error by refetching
                fetchUnreadData()
            })
    }, [fetchUnreadData])

    // --- Socket Event Handling ---
    useEffect(() => {
        const socket = getSocket()
        if (!socket || !logic.isUserLoggedIn()) return

        // --- Socket Event Handlers ---
        const handleNewMessage = message => {
            try {
                const currentUserId = logic.getUserId()

                // Validate message data
                if (!message?.matchId || !message?.sender || message.sender === currentUserId)
                    return

                // Notify registered message listeners
                messageListeners.forEach(listener => {
                    try {
                        listener(message)
                    } catch (error) {
                        alert(error.message)
                        console.error(error)
                    }
                })

                // Check if user is currently viewing this match
                const viewingMatchId = getCurrentMatchId()

                if (message.matchId === viewingMatchId) {
                    // If viewing the chat, mark it as read immediately
                    markMatchAsRead(message.matchId)
                } else {
                    // Otherwise, increment unread count
                    setUnreadMatches(prev => {
                        const newMatches = {
                            ...prev,
                            [message.matchId]: (prev[message.matchId] || 0) + 1
                        }

                        // Update total count in same render cycle
                        setUnreadCount(prevCount => prevCount + 1)

                        return newMatches
                    })
                }
            } catch (error) {
                alert(error.message)
                console.error(error)
            }
        }

        const handleUnmatch = ({ matchId }) => {
            if (!matchId) return

            // Clean up unread counts for unmatched conversation
            setUnreadMatches(prev => {
                if (!prev[matchId]) return prev // No change needed

                const newState = { ...prev }
                const removedCount = newState[matchId]
                delete newState[matchId]

                // Update total count in same operation
                setUnreadCount(prevCount => Math.max(0, prevCount - removedCount))

                return newState
            })
        }

        const handleNewMatch = newMatchData => {
            try {
                const currentUserId = logic.getUserId()

                // Validate match data
                if (!newMatchData?._id || !newMatchData?.users?.some(u => u?._id === currentUserId))
                    return

                // Notify registered match listeners
                matchListeners.forEach(listener => {
                    try {
                        listener(newMatchData)
                    } catch (error) {
                        alert(error.message)
                        console.error(error)
                    }
                })
            } catch (error) {
                alert(error.message)
                console.error(error)
            }
        }

        // Register socket event handlers
        socket.on('newMessage', handleNewMessage)
        socket.on('unmatch', handleUnmatch)
        socket.on('newMatch', handleNewMatch)

        // Initial data fetch when socket connects
        socket.on('connect', fetchUnreadData)

        // Perform initial fetch if already connected
        if (socket.connected)
            fetchUnreadData()

        // Cleanup function
        return () => {
            if (socket) {
                socket.off('connect', fetchUnreadData)
                socket.off('newMessage', handleNewMessage)
                socket.off('unmatch', handleUnmatch)
                socket.off('newMatch', handleNewMatch)
            }
        }
    }, [getCurrentMatchId, fetchUnreadData, markMatchAsRead, messageListeners, matchListeners])

    // --- Auth Change Handling ---
    useEffect(() => {
        const handleAuthChange = () => {
            if (logic.isUserLoggedIn()) {
                fetchUnreadData()
            } else {
                // Clear state on logout
                setUnreadMatches({})
                setUnreadCount(0)
            }
        }

        document.addEventListener('authChange', handleAuthChange)
        return () => document.removeEventListener('authChange', handleAuthChange)
    }, [fetchUnreadData])

    // --- Provider Value ---
    const value = {
        unreadCount,
        unreadMatches,
        hasUnreadMessages: unreadCount > 0,
        refreshNotifications: fetchUnreadData, // Expose manual refresh
        markMatchAsRead,
        registerMessageListener,
        registerMatchListener
    }

    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    )
}

export const useNotifications = () => useContext(NotificationContext)