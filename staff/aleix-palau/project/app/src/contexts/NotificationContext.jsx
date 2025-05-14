import { createContext, useState, useEffect, useCallback, useContext } from 'react'
import logic from '../logic'
import { getSocket } from '../socket'
import { useLocation } from 'react-router-dom'

export const NotificationContext = createContext()

export const NotificationProvider = ({ children }) => {
    const [unreadMatches, setUnreadMatches] = useState({})
    const [unreadCount, setUnreadCount] = useState(0)
    const [pendingMatchNotificationsQueue, setPendingMatchNotificationsQueue] = useState([])
    const [messageListeners] = useState(new Set())
    const [matchListeners] = useState(new Set())

    const location = useLocation()

    // Helpers
    const getCurrentMatchId = useCallback(() => {
        const match = location.pathname.match(/^\/chat\/([a-zA-Z0-9]+)$/)
        return match ? match[1] : null
    }, [location.pathname])

    const clearNotificationState = useCallback(() => {
        setUnreadMatches({})
        setUnreadCount(0)
        setPendingMatchNotificationsQueue([])
    }, [])

    // Listener registration
    const registerMessageListener = useCallback(listener => {
        messageListeners.add(listener)
        return () => messageListeners.delete(listener)
    }, [messageListeners])

    const registerMatchListener = useCallback(listener => {
        matchListeners.add(listener)
        return () => matchListeners.delete(listener)
    }, [matchListeners])

    // Data fetching
    const fetchUnreadData = useCallback(() => {
        if (!logic.isUserLoggedIn()) {
            clearNotificationState()
            return
        }

        logic.getUnreadNotifications()
            .then(result => {
                if (!result) {
                    clearNotificationState()
                    return
                }

                // Process message notifications
                const matches = result.messageNotificationCounts?.matches || {}
                setUnreadMatches(matches)

                // Calculate total unread count
                const totalMessages = Object.values(matches).reduce((sum, count) => sum + count, 0)
                setUnreadCount(totalMessages)

                // Update pending match notifications queue
                setPendingMatchNotificationsQueue(result.pendingMatchNotifications || [])
            })
            .catch(error => {
                console.error('Error fetching unread notifications:', error)
                clearNotificationState()
            })
    }, [clearNotificationState])

    // Message notifications handling
    const markMatchAsRead = useCallback(matchId => {
        if (!matchId) return

        // Optimistic update
        setUnreadMatches(prev => {
            const newState = { ...prev }
            const countToRemove = newState[matchId] || 0
            delete newState[matchId]
            setUnreadCount(prevCount => Math.max(0, prevCount - countToRemove))
            return newState
        })

        // Server update
        logic.markMessageNotificationsAsRead(matchId)
            .catch(error => {
                console.error('Failed to mark message notifications as read:', error)
                fetchUnreadData() // Revert optimistic update on error
            })
    }, [fetchUnreadData])

    // Match notifications handling
    const markAndDequeueMatchNotification = useCallback(async notificationId => {
        if (!notificationId) return

        // Optimistic update
        setPendingMatchNotificationsQueue(prev => prev.filter(n => n._id !== notificationId))

        try {
            await logic.markMatchNotificationAsRead(notificationId)
        } catch (error) {
            console.error("Failed to mark match notification as read:", error)
            fetchUnreadData() // Refresh data on error
            throw error // Propagate error for UI feedback
        }
    }, [fetchUnreadData])

    // Socket event handling
    useEffect(() => {
        const socket = getSocket()
        if (!socket || !logic.isUserLoggedIn()) return

        // Handle incoming messages
        const handleNewMessage = message => {
            try {
                const currentUserId = logic.getUserId()
                if (!message?.matchId || !message?.sender || message.sender === currentUserId) return

                // Notify listeners first
                messageListeners.forEach(listener => {
                    try {
                        listener(message)
                    } catch (error) {
                        console.error('Error in message listener:', error)
                    }
                })

                // If viewing this match, mark as read immediately
                const viewingMatchId = getCurrentMatchId()
                if (message.matchId === viewingMatchId) {
                    markMatchAsRead(message.matchId)
                } else {
                    // Otherwise, increment unread count
                    setUnreadMatches(prev => {
                        const newMatches = {
                            ...prev,
                            [message.matchId]: (prev[message.matchId] || 0) + 1
                        }
                        setUnreadCount(prevCount => prevCount + 1)
                        return newMatches
                    })
                }
            } catch (error) {
                console.error('Error handling new message:', error)
            }
        }

        // Handle unmatch events
        const handleUnmatch = ({ matchId }) => {
            if (!matchId) return
            // Update unread count
            setUnreadMatches(prev => {
                if (!prev[matchId]) return prev

                const newState = { ...prev }
                const removedCount = newState[matchId]
                delete newState[matchId]
                setUnreadCount(prevCount => Math.max(0, prevCount - removedCount))
                return newState
            })

            // Refresh all notification data since unmatch affects match notifications
            fetchUnreadData()
        }

        // Handle new match events
        const handleNewMatch = newMatchData => {
            try {
                const currentUserId = logic.getUserId()
                if (!newMatchData?._id || !newMatchData?.users?.some(u => u?._id === currentUserId)) return

                // Notify match listeners
                matchListeners.forEach(listener => {
                    try {
                        listener(newMatchData)
                    } catch (error) {
                        console.error('Error in match listener:', error)
                    }
                })
            } catch (error) {
                console.error('Error handling new match:', error)
            }
        }

        // Register socket event handlers
        socket.on('newMessage', handleNewMessage)
        socket.on('unmatch', handleUnmatch)
        socket.on('newMatch', handleNewMatch)
        socket.on('connect', fetchUnreadData)

        // Initial fetch if already connected
        if (socket.connected) fetchUnreadData()

        // Cleanup
        return () => {
            if (socket) {
                socket.off('connect', fetchUnreadData)
                socket.off('newMessage', handleNewMessage)
                socket.off('unmatch', handleUnmatch)
                socket.off('newMatch', handleNewMatch)
            }
        }
    }, [getCurrentMatchId, fetchUnreadData, markMatchAsRead, messageListeners, matchListeners])

    // Handle auth changes
    useEffect(() => {
        const handleAuthChange = () => {
            if (logic.isUserLoggedIn()) {
                fetchUnreadData()
            } else {
                clearNotificationState()
            }
        }

        document.addEventListener('authChange', handleAuthChange)
        return () => document.removeEventListener('authChange', handleAuthChange)
    }, [fetchUnreadData, clearNotificationState])

    const value = {
        unreadCount,
        unreadMatches,
        hasUnreadMessages: unreadCount > 0,
        refreshNotifications: fetchUnreadData,
        markMatchAsRead,
        registerMessageListener,
        registerMatchListener,
        pendingMatchNotificationsQueue,
        markAndDequeueMatchNotification
    }

    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    )
}

export const useNotifications = () => useContext(NotificationContext)