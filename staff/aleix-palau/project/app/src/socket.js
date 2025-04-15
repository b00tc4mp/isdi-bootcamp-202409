import { io } from 'socket.io-client'

let socket = null

// Function to initialize or get the socket instance
export const getSocket = () => {
    if (!socket && localStorage.token) {
        console.log("Initializing socket connection...")
        socket = io(`http://${import.meta.env.VITE_API_URL}`, {
            autoConnect: false, // Connect manually after setup
            auth: {
                token: localStorage.token
            },
            reconnectionAttempts: 5, // Optional: Limit reconnection attempts
            reconnectionDelay: 1000, // Optional: Delay between attempts
        })

        // Optional: Log socket events for debugging
        socket.on('connect', () => console.log('Socket connected:', socket.id))
        socket.on('disconnect', (reason) => console.log('Socket disconnected:', reason))
        socket.on('connect_error', (error) => console.error('Socket connection error:', error))

    } else if (!localStorage.token && socket) {
        console.log("Token removed, disconnecting socket.")
        disconnectSocket() // Disconnect if token is removed
    }
    return socket
}

// Function to manually connect the socket
export const connectSocket = () => {
    const currentSocket = getSocket() // Ensure socket is initialized
    if (currentSocket && !currentSocket.connected) {
        console.log("Attempting to connect socket...")
        currentSocket.connect()
    } else if (currentSocket && currentSocket.connected) {
        console.log("Socket already connected.")
    } else {
        console.log("Cannot connect socket: No token found.")
    }
}

// Function to update token and reconnect if necessary
export const updateSocketToken = token => {
    const currentSocket = getSocket() // Ensure socket is initialized
    if (!currentSocket) {
        console.error("Cannot update token: Socket not initialized.")
        return
    }

    // Update the auth token
    currentSocket.auth = { token }
    console.log("Socket token updated.")

    // Disconnect and reconnect if the socket is currently connected
    if (currentSocket.connected) {
        console.log("Reconnecting socket with new token...")
        currentSocket.disconnect().connect()
    } else if (!currentSocket.connected && token) {
        // If not connected but we have a token, try connecting
        connectSocket()
    }
}

// Helper function to join a specific match room
export const joinMatchRoom = matchId => {
    const currentSocket = getSocket()
    if (currentSocket && currentSocket.connected && matchId) {
        console.log(`Emitting joinMatchRoom for ${matchId}`)
        currentSocket.emit('joinMatchRoom', matchId)
    } else {
        console.log(`Could not join room ${matchId}: Socket not connected or matchId missing.`)
    }
}

// Helper function to leave a specific match room
export const leaveMatchRoom = matchId => {
    const currentSocket = getSocket()
    if (currentSocket && currentSocket.connected && matchId) {
        console.log(`Emitting leaveMatchRoom for ${matchId}`)
        currentSocket.emit('leaveMatchRoom', matchId) // Assuming backend handles this
    } else {
        console.log(`Could not leave room ${matchId}: Socket not connected or matchId missing.`)
    }
}

// Helper function to disconnect socket
export const disconnectSocket = () => {
    if (socket && socket.connected) {
        console.log("Disconnecting socket...")
        socket.disconnect()
    }
    socket = null // Clear the instance on explicit disconnect
}

// Listen for token updates from logic (e.g., after login)
document.addEventListener('tokenUpdated', event => {
    if (event.detail.token) {
        updateSocketToken(event.detail.token)
    } else {
        disconnectSocket() // Disconnect if token becomes null/undefined
    }
})

// Clean up on page unload
window.addEventListener('beforeunload', disconnectSocket)