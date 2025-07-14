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

    // Get current match ID from URL
    const getCurrentMatchId = useCallback(() => {
        const match = location.pathname.match(/^\/chat\/([a-zA-Z0-9]+)$/)
        return match?.[1] || null
    }, [location.pathname])

    // Clear all notification state
    const clearNotificationState = useCallback(() => {
        setUnreadMatches({})
        setUnreadCount(0)
        setPendingMatchNotificationsQueue([])
    }, [])

    // Register listeners
    const registerListener = useCallback((listeners, listener) => {
        listeners.add(listener)
        return () => listeners.delete(listener)
    }, [])

    const registerMessageListener = useCallback(listener =>
        registerListener(messageListeners, listener), [messageListeners, registerListener])

    const registerMatchListener = useCallback(listener =>
        registerListener(matchListeners, listener), [matchListeners, registerListener])

    // Fetch unread notifications
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

                // Update message counts
                const matches = result.messageNotificationCounts?.matches || {}
                setUnreadMatches(matches)
                setUnreadCount(Object.values(matches).reduce((sum, count) => sum + count, 0))

                // Update match notifications
                setPendingMatchNotificationsQueue(result.pendingMatchNotifications || [])
            })
            .catch(error => {
                console.error('Error fetching notifications:', error)
                clearNotificationState()
            })
    }, [clearNotificationState])

    // Mark match messages as read
    const markMatchAsRead = useCallback(matchId => {
        if (!matchId) return

        setUnreadMatches(prev => {
            const newState = { ...prev }
            const count = newState[matchId] || 0
            delete newState[matchId]
            setUnreadCount(current => Math.max(0, current - count))
            return newState
        })

        logic.markMessageNotificationsAsRead(matchId).catch(() => fetchUnreadData())
    }, [fetchUnreadData])

    // Mark and dequeue match notification
    const markAndDequeueMatchNotification = useCallback(async notificationId => {
        if (!notificationId) return

        setPendingMatchNotificationsQueue(prev => prev.filter(n => n._id !== notificationId))

        try {
            await logic.markMatchNotificationAsRead(notificationId)
        } catch (error) {
            console.error('Failed to mark notification as read:', error)
            fetchUnreadData()
            throw error
        }
    }, [fetchUnreadData])

    // Socket event handling
    useEffect(() => {
        const socket = getSocket()
        if (!socket || !logic.isUserLoggedIn()) return

        const currentUserId = logic.getUserId()
        const currentMatchId = getCurrentMatchId()

        // Message handler
        const handleNewMessage = message => {
            if (!message?.matchId || message.sender === currentUserId) return

            // Notify listeners
            messageListeners.forEach(listener => listener(message))

            // Update unread count
            if (message.matchId === currentMatchId) {
                markMatchAsRead(message.matchId)
            } else {
                setUnreadMatches(prev => ({
                    ...prev,
                    [message.matchId]: (prev[message.matchId] || 0) + 1
                }))
                setUnreadCount(prev => prev + 1)
            }
        }

        // Unmatch handler
        const handleUnmatch = ({ matchId }) => {
            if (!matchId) return

            setUnreadMatches(prev => {
                const newState = { ...prev }
                const count = newState[matchId] || 0
                delete newState[matchId]
                setUnreadCount(current => Math.max(0, current - count))
                return newState
            })

            fetchUnreadData()
        }

        // Match handler
        const handleNewMatch = matchData => {
            if (!matchData?._id) return

            const isUserInMatch = matchData.users?.some(u => u._id === currentUserId)
            if (!isUserInMatch) return

            matchListeners.forEach(listener => listener(matchData))
            fetchUnreadData()
        }

        // Setup socket listeners
        const setupSocketListeners = () => {
            socket.on('connect', fetchUnreadData)
            socket.on('reconnect', fetchUnreadData)
            socket.on('newMessage', handleNewMessage)
            socket.on('unmatch', handleUnmatch)
            socket.on('newMatch', handleNewMatch)
        }

        setupSocketListeners()
        if (socket.connected) fetchUnreadData()

        return () => {
            socket.off('connect')
            socket.off('reconnect')
            socket.off('newMessage')
            socket.off('unmatch')
            socket.off('newMatch')
        }
    }, [getCurrentMatchId, fetchUnreadData, markMatchAsRead, messageListeners, matchListeners])

    // Handle auth changes
    useEffect(() => {
        const handleAuthChange = () => {
            logic.isUserLoggedIn() ? fetchUnreadData() : clearNotificationState()
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