// ============= SOCKET UTILITY FUNCTIONS =============

// Emit an event to a specific user
export const emitToUser = (io, userSockets, userId, eventName, data) => {
    if (!io || !userSockets) {
        console.error(`Cannot emit ${eventName}: Socket.IO instance or userSockets map not available`)
        return false
    }

    const socketId = userSockets.get(userId.toString())
    if (socketId) {
        io.to(socketId).emit(eventName, data)
        console.log(`Emitted ${eventName} to user ${userId} (socket ${socketId})`)
        return true
    } else {
        console.log(`User ${userId} not connected, cannot emit ${eventName}`)
        return false
    }
}

// Emit an event to a match room
export const emitToMatchRoom = (io, matchId, eventName, data) => {
    if (!io) {
        console.error(`Cannot emit ${eventName} to match room: Socket.IO instance not available`)
        return false
    }

    const roomName = `match:${matchId}`
    io.to(roomName).emit(eventName, data)
    console.log(`Emitted ${eventName} to room ${roomName}`)
    return true
}

// Emit an event to a match room, excluding a specific socket
export const emitToMatchRoomExcept = (io, userSockets, matchId, excludeUserId, eventName, data) => {
    if (!io || !userSockets) {
        console.error(`Cannot emit ${eventName} to match room: Socket.IO instance or userSockets map not available`)
        return false
    }

    const roomName = `match:${matchId}`
    const excludeSocketId = userSockets.get(excludeUserId.toString())

    if (excludeSocketId) {
        io.to(roomName).except(excludeSocketId).emit(eventName, data)
        console.log(`Emitted ${eventName} to room ${roomName}, excluding socket ${excludeSocketId}`)
    } else {
        // Fallback if socket not found
        io.to(roomName).emit(eventName, data)
        console.log(`Emitted ${eventName} to room ${roomName} (could not exclude user ${excludeUserId})`)
    }
    return true
}

// Add a user to a match room
export const addUserToMatchRoom = (io, userSockets, userId, matchId) => {
    if (!io || !userSockets) {
        console.error(`Cannot add user to match room: Socket.IO instance or userSockets map not available`)
        return false
    }

    const socketId = userSockets.get(userId.toString())
    if (!socketId) {
        console.log(`User ${userId} not connected, cannot add to match room`)
        return false
    }

    const socket = io.sockets.sockets.get(socketId)
    if (!socket) {
        console.error(`Socket ${socketId} not found for user ${userId}`)
        return false
    }

    const roomName = `match:${matchId}`
    try {
        socket.join(roomName)
        console.log(`User ${userId} joined room ${roomName}`)
        return true
    } catch (error) {
        console.error(`Error joining room ${roomName} for user ${userId}:`, error)
        return false
    }
}

export default {
    emitToUser,
    emitToMatchRoom,
    emitToMatchRoomExcept,
    addUserToMatchRoom
}