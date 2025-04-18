import React, { createContext, useState, useEffect, useCallback, useContext, useRef } from 'react'
import logic from '../logic'
import { getSocket, connectSocket, disconnectSocket } from '../socket' // Import all socket functions
import { useLocation } from 'react-router-dom'

export const NotificationContext = createContext()

export const NotificationProvider = ({ children }) => {
    const [unreadCount, setUnreadCount] = useState(0)
    const [unreadMatches, setUnreadMatches] = useState({}) // Store { matchId: count }
    const [userId, setUserId] = useState(null) // Internal userId state
    const [isConnected, setIsConnected] = useState(false) // Track socket connection status
    const location = useLocation() // Get current location
    // Ref to store message listeners (e.g., from Chat.jsx)
    const messageListeners = useRef(new Set()) // Use a Set to avoid duplicate listeners
    const matchListeners = useRef(new Set()) // Use a Set for match listeners

    // --- Message Listener Registration ---
    const registerMessageListener = useCallback((listener) => {
        messageListeners.current.add(listener)
        console.log("Message listener registered. Count:", messageListeners.current.size)
    }, [])

    const unregisterMessageListener = useCallback((listener) => {
        messageListeners.current.delete(listener)
        console.log("Message listener unregistered. Count:", messageListeners.current.size)
    }, [])

    // --- Match Listener Registration ---
    const registerMatchListener = useCallback((listener) => {
        matchListeners.current.add(listener)
        console.log("Match listener registered. Count:", matchListeners.current.size)
    }, [])

    const unregisterMatchListener = useCallback((listener) => {
        matchListeners.current.delete(listener)
        console.log("Match listener unregistered. Count:", matchListeners.current.size)
    }, [])

    // Function to extract matchId from current path
    const getCurrentMatchId = useCallback(() => {
        const match = location.pathname.match(/^\/chat\/([a-zA-Z0-9]+)$/)
        return match ? match[1] : null
    }, [location.pathname])

    // Fetch initial/updated unread data (more robust)
    const fetchUnreadData = useCallback(async (currentUserId) => {
        if (!currentUserId) return
        console.log("Fetching unread data for user:", currentUserId)
        try {
            // Assuming getUnreadNotifications returns { count: number, matches: { matchId: count } }
            // Adjust based on your actual API response structure
            const result = await logic.getUnreadNotifications()
            if (result) {
                setUnreadMatches(result.matches || {})
                // Total count will be derived via useEffect below
                console.log("Unread data fetched:", result)
            }
        } catch (error) {
            console.error("Failed to fetch unread notifications:", error)
            setUnreadMatches({}) // Clear on error
        }
    }, [])

    // Function to mark a specific match as read
    const markMatchAsRead = useCallback(async (matchIdToMark) => {
        if (!matchIdToMark || !userId || !unreadMatches[matchIdToMark]) return // Only proceed if actually unread

        console.log(`Attempting to mark match ${matchIdToMark} as read`)

        // Optimistically update frontend state
        const previousUnreadMatches = { ...unreadMatches } // Store previous state for potential revert
        setUnreadMatches(prev => {
            const newState = { ...prev }
            delete newState[matchIdToMark] // Remove the key
            return newState
        })
        console.log(`Optimistically cleared unread status for match ${matchIdToMark} in context`)

        // Call backend to mark as read
        try {
            await logic.markNotificationsAsRead(matchIdToMark)
            console.log(`Backend call successful: Marked match ${matchIdToMark} as read`)
        } catch (error) {
            console.error(`Failed to mark match ${matchIdToMark} as read on backend:`, error)
            // Revert frontend state on backend failure
            setUnreadMatches(previousUnreadMatches)
            // Optionally: Show an error to the user via an alert context if available
        }
    }, [userId, unreadMatches]) // Dependencies: userId and the unreadMatches state itself

    // Effect to handle user login/logout, socket connection, and initial fetch
    useEffect(() => {
        let isMounted = true
        const checkUserAndConnect = async () => {
            if (logic.isUserLoggedIn()) {
                const currentUserId = logic.getUserId()
                if (isMounted) {
                    setUserId(currentUserId)
                    connectSocket() // Connect the socket
                    setIsConnected(true)
                    await fetchUnreadData(currentUserId) // Fetch initial data
                }
            } else {
                if (isMounted) {
                    setUserId(null)
                    setUnreadMatches({})
                    setUnreadCount(0)
                    disconnectSocket() // Disconnect socket on logout
                    setIsConnected(false)
                }
            }
        }

        checkUserAndConnect()

        return () => {
            isMounted = false
            // Cleanup on unmount (though usually handled by login/logout changes)
            if (isConnected) {
                disconnectSocket()
            }
        }
        // Rerun when fetchUnreadData changes (should be stable)
        // This effect primarily runs on mount or if logic.isUserLoggedIn changes indirectly
    }, [fetchUnreadData]) // Dependency ensures fetch function is available

    // Socket listeners effect - depends on userId and connection status
    useEffect(() => {
        // Only setup listeners if we have a userId and the socket should be connected
        if (!userId || !isConnected) return
        const socket = getSocket()
        if (!socket) {
            console.warn("Socket not available for setting up listeners.")
            // Attempt to reconnect or wait? For now, just return.
            // Consider adding a retry mechanism if socket connection is intermittent.
            return
        }

        console.log("Setting up global socket listeners for notifications (User ID:", userId, ")")

        const handleNewMessage = (message) => { // message includes matchId
            console.log('Global listener: Received newMessage event:', message)
            if (!message || !message.matchId || !message.sender || message.sender === userId) {
                return // Ignore irrelevant messages or own messages
            }

            // Notify registered message listeners
            // Pass the raw message data so the listener can update its state
            messageListeners.current.forEach(listener => {
                try {
                    listener(message) // Call the registered listener function
                } catch (error) {
                    console.error("Error executing message listener:", error)
                }
            })

            const viewingMatchId = getCurrentMatchId() // Check current location *inside* the handler

            if (message.matchId === viewingMatchId) {
                // If viewing the chat, mark it as read immediately (no need for custom event)
                console.log(`Message for viewed chat ${viewingMatchId}. Marking as read.`)
                // Directly call the stable markMatchAsRead function
                markMatchAsRead(message.matchId)
            } else {
                // If not viewing the chat, update unread counts
                console.log(`Message for non-viewed chat ${message.matchId}. Updating counts.`)
                setUnreadMatches(prev => ({
                    ...prev,
                    [message.matchId]: (prev[message.matchId] || 0) + 1,
                }))
            }
        }

        const handleUnmatch = ({ matchId: unmatchedMatchId }) => {
            console.log(`Global listener: Received unmatch event for match ${unmatchedMatchId}`)
            setUnreadMatches(prev => {
                const newState = { ...prev }
                delete newState[unmatchedMatchId]
                return newState
            })
            // TODO: Consider notifying listeners about unmatch too if Chat.jsx needs to react instantly
        }

        // --- Add handleNewMatch ---
        const handleNewMatch = (newMatchData) => {
            console.log('Global listener: Received newMatch event:', newMatchData)
            // Make sure data is valid and relevant (optional check: is current user part of the match?)
            if (!newMatchData || !newMatchData._id || !newMatchData.users || !newMatchData.users.some(u => u._id === userId)) {
                console.warn("Received invalid or irrelevant newMatch event data.")
                return
            }

            // Notify registered match listeners (e.g., AppContent)
            matchListeners.current.forEach(listener => {
                try {
                    listener(newMatchData) // Pass the full match data
                } catch (error) {
                    console.error("Error executing match listener:", error)
                }
            })
            // Note: We don't update unread counts here for matches,
            // unless your app logic requires it. The primary action is UI notification.
        }
        // --- End handleNewMatch ---


        socket.on('newMessage', handleNewMessage)
        socket.on('unmatch', handleUnmatch)
        socket.on('newMatch', handleNewMatch)

        // Cleanup: Remove listeners when userId changes or component unmounts
        return () => {
            console.log("Cleaning up global notification socket listeners")
            socket.off('newMessage', handleNewMessage)
            socket.off('unmatch', handleUnmatch)
            socket.off('newMatch', handleNewMatch)
        }
    }, [userId, isConnected, markMatchAsRead, getCurrentMatchId])

    // Recalculate total unread count whenever unreadMatches changes
    useEffect(() => {
        const total = Object.values(unreadMatches).reduce((sum, count) => sum + count, 0)
        setUnreadCount(total)
        console.log("Total unread count updated:", total)
    }, [unreadMatches])

    const value = {
        unreadCount,
        unreadMatches,
        hasUnreadMessages: unreadCount > 0,
        // Expose fetchUnreadData as fetchUnread for potential manual refresh?
        // Use cautiously, as it should generally update automatically.
        fetchUnread: () => fetchUnreadData(userId),
        // Expose markMatchAsRead for direct use by components like Chat.jsx
        markMatchAsRead,
        // Expose listener registration functions
        registerMessageListener,
        unregisterMessageListener,
        registerMatchListener,
        unregisterMatchListener
    }

    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    )
}

// Custom hook remains the same
export const useNotifications = () => useContext(NotificationContext)