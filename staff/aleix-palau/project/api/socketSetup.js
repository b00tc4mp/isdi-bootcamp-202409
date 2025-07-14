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

    // Authentication middleware
    io.use((socket, next) => {
        const token = socket.handshake.auth.token

        if (!token)
            return next(new AuthorizationError('Authentication error: Token missing'))

        try {
            const { sub: userId } = jwt.verify(token, process.env.JWT_SECRET)
            socket.userId = userId // Attach userId to the socket object
            next()
        } catch (error) {
            next(new AuthorizationError('Authentication error: Invalid token'))
        }
    })

    // Handle connections
    io.on('connection', async socket => {
        const userId = socket.userId

        if (!userId) {
            socket.disconnect()
            return
        }

        // Store user's socket for direct messaging/lookups
        userSockets.set(userId, socket.id)

        // Join user's match rooms
        try {
            const matchIds = await Match.find({ users: userId }).distinct('_id').lean()
            matchIds.forEach(matchId => socket.join(`match:${matchId}`))
        } catch (error) {
            console.error(`Error joining match rooms for user ${userId}:`, error)
        }

        // Handle disconnect
        socket.on('disconnect', () => {
            userSockets.delete(userId)
        })

        // Handle errors
        socket.on('error', error => {
            console.error(`Socket error for user ${userId}:`, error)
        })
    })

    return { io, userSockets }
}

export const getIoInstance = () => io
export const getUserSockets = () => userSockets