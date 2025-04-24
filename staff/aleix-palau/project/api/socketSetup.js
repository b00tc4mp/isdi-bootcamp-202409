import { Server } from 'socket.io'
import jwt from 'jsonwebtoken'
import { errors } from 'com'
import { Match } from 'dat'

const { AuthorizationError } = errors

let io = null
const userSockets = new Map() // Map to store userId to socketId

// ============= SOCKET INITIALIZATION =============

export function initializeSocket(server) {
    io = new Server(server, {
        cors: {
            origin: [`http://${process.env.VITE_APP_URL}`, `http://${process.env.VITE_API_URL}`],
            methods: ['GET', 'POST'],
            credentials: true
        }
    })

    // Authentication middleware for Socket.io
    io.use((socket, next) => {
        const token = socket.handshake.auth.token
        if (!token) {
            console.error("Socket Auth Error: Token missing")
            return next(new AuthorizationError('Authentication error: Token missing'))
        }

        try {
            const { sub: userId } = jwt.verify(token, process.env.JWT_SECRET)
            socket.userId = userId // Attach userId to the socket object
            console.log(`Socket authenticated for user: ${userId}`)
            next()
        } catch (error) {
            console.error("Socket Auth Error:", error.message)
            next(new AuthorizationError('Authentication error: Invalid token'))
        }
    })

    io.on('connection', socket => {
        const userId = socket.userId
        if (!userId) {
            console.error("Socket connection without userId after auth middleware. Disconnecting.")
            socket.disconnect()
            return
        }

        // Store user's socket for direct messaging/lookups
        userSockets.set(userId, socket.id)
        console.log(`User connected: ${socket.id}, userId: ${userId}`)

        // Join Rooms on Connection
        Match.find({ users: userId })
            .distinct('_id')
            .lean()
            .then(matchIds => {
                if (Array.isArray(matchIds)) {
                    matchIds.forEach(matchId => {
                        const roomName = `match:${matchId}`
                        try {
                            socket.join(roomName)
                            console.log(`User ${userId} joined room ${roomName}`)
                        } catch (joinError) {
                            console.error(`Error joining room ${roomName} for user ${userId}:`, joinError)
                        }
                    })
                }
            })
            .catch(error => {
                console.error(`Error fetching matches for user ${userId} to join rooms:`, error)
            })

        // Handle Disconnect
        socket.on('disconnect', reason => {
            console.log(`User disconnected: ${userId}, reason: ${reason}`)
            userSockets.delete(userId)
            // Socket automatically leaves all rooms on disconnect
        })

        // Handle connection errors *after* initial connection attempt
        socket.on('error', error => {
            console.error(`Socket error for user ${userId}:`, error)
        })
    })

    console.log("Socket.IO server setup complete.")

    return { io, userSockets }
}

export const getIoInstance = () => io
export const getUserSockets = () => userSockets