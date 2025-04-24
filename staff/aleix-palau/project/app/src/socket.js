import { io } from 'socket.io-client'

let socket = null

// Initialize or get the socket instance
export const getSocket = () => {
    if (!socket && localStorage.token) {
        console.log("Initializing socket connection...")
        socket = io(`http://${import.meta.env.VITE_API_URL}`, {
            auth: { token: localStorage.token },
            reconnectionAttempts: 5, // Limit reconnection attempts
            reconnectionDelay: 1000, // Delay between attempts
        })

        // Listeners setup
        socket.on('connect', () => {
            console.log('Socket connected:', socket.id)
            // Dispatch event so other components can react to connection
            document.dispatchEvent(new CustomEvent('socketConnected'))
        })

        socket.on('disconnect', reason => console.log('Socket disconnected:', reason))

        socket.on('connect_error', error => console.error('Socket connection error:', error.message))

        // Connect immediately
        socket.connect()
    }

    return socket
}

// Clean up socket connection
export const disconnectSocket = () => {
    if (socket) {
        if (socket.connected)
            socket.disconnect()

        // Clean up listeners to prevent memory leaks
        socket.off()
        socket = null
        console.log("Socket disconnected and cleaned up")
    }
}

// Handle token updates in a single place
export const handleTokenChange = token => {
    const wasConnected = socket?.connected

    // Clean up existing socket if token is removed or changed
    if (socket) disconnectSocket()

    if (token) {
        // Token was added or updated - store it first
        localStorage.token = token

        // Get a fresh socket instance (will initialize with new token)
        getSocket()

        if (wasConnected) console.log("Socket reconnected with new token")
    } else {
        // Token was removed
        delete localStorage.token
        console.log("Token removed, socket disconnected")
    }

    // Dispatch auth change event
    document.dispatchEvent(new CustomEvent('authChange', {
        detail: { loggedIn: !!token }
    }))
}

// Listen for token updates
document.addEventListener('tokenUpdated', event => {
    handleTokenChange(event.detail.token)
})

// Clean up on page unload
window.addEventListener('beforeunload', disconnectSocket)

export default { getSocket, disconnectSocket, handleTokenChange }