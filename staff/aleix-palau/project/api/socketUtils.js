// ============= SOCKET UTILITY FUNCTIONS =============

// Emit an event to a specific user
export const emitToUser = (io, userSockets, userId, eventName, data) => {
    if (!io || !userSockets) return false

    const userIdStr = userId.toString()
    const socketId = userSockets.get(userIdStr)

    if (socketId) {
        const socket = io.sockets.sockets.get(socketId)
        if (socket?.connected) {
            io.to(socketId).emit(eventName, data)
            return true
        }
        // Clean up stale socket mapping
        userSockets.delete(userIdStr)
    }

    return false
}

// Emit an event to a match room
export const emitToMatchRoom = (io, matchId, eventName, data) => {
    if (!io) return false

    io.to(`match:${matchId}`).emit(eventName, data)
    return true
}

// Emit an event to a match room, excluding a specific user
export const emitToMatchRoomExcept = (io, userSockets, matchId, excludeUserId, eventName, data) => {
    if (!io || !userSockets) return false

    const roomName = `match:${matchId}`
    const excludeSocketId = userSockets.get(excludeUserId.toString())

    if (excludeSocketId) {
        io.to(roomName).except(excludeSocketId).emit(eventName, data)
    } else {
        io.to(roomName).emit(eventName, data)
    }

    return true
}

// Add a user to a match room
export const addUserToMatchRoom = (io, userSockets, userId, matchId) => {
    if (!io || !userSockets) return false

    const socketId = userSockets.get(userId.toString())
    if (!socketId) return false

    const socket = io.sockets.sockets.get(socketId)
    if (!socket?.connected) {
        userSockets.delete(userId.toString())
        return false
    }

    try {
        socket.join(`match:${matchId}`)
        return true
    } catch (error) {
        console.error('Error joining room:', error)
        return false
    }
}

export default {
    emitToUser,
    emitToMatchRoom,
    emitToMatchRoomExcept,
    addUserToMatchRoom
}