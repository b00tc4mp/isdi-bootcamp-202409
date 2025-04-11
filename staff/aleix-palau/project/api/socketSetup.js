import { Server } from 'socket.io'
import jwt from 'jsonwebtoken'
import { errors } from 'com'
import { Match } from 'dat'

const { AuthorizationError } = errors

export default function setupSocket(server) {
    const io = new Server(server, {
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

    // Map to store userId to socketId for direct messaging/lookups
    const userSockets = new Map()

    io.on('connection', socket => {
        const userId = socket.userId
        if (!userId) {
            console.error("Socket connection without userId after auth middleware. Disconnecting.")
            socket.disconnect()
            return
        }

        // Store user's socket for direct messaging
        userSockets.set(userId, socket.id)
        console.log(`User connected: ${socket.id}, userId: ${userId}`)

        // Join rooms for all user's matches ONCE on connection
        // (Alternative: join dynamically when chat list/conversation opens, but this is simpler for now)
        Match.find({ users: userId }).distinct('_id')
            .then(matchIds => {
                if (Array.isArray(matchIds)) {
                    matchIds.forEach(matchId => {
                        const roomName = `match:${matchId}`
                        socket.join(roomName)
                        console.log(`User ${userId} joined room ${roomName}`)
                    })
                }
            }).catch(error => console.error(`Error fetching matches for user ${userId} to join rooms:`, error))


        // --- Event Handlers ---

        // Handle joining specific match rooms (e.g., if joining dynamically)
        socket.on('joinMatchRoom', matchId => {
            if (matchId) {
                const roomName = `match:${matchId}`
                socket.join(roomName)
                console.log(`User ${userId} dynamically joined room ${roomName}`)
            }
        })

        // Handle Disconnect
        socket.on('disconnect', reason => {
            console.log(`User disconnected: ${userId}, reason: ${reason}`)
            userSockets.delete(userId)
            // Optionally notify others if needed (e.g., presence system)
        })

        // Handle connection errors after initial connection
        socket.on('error', error => {
            console.error(`Socket error for user ${userId}:`, error)
        })
    })

    console.log("Socket.IO server setup complete.")
    return { io, userSockets } // Return io instance and user map
}