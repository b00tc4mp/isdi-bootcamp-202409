import { Server } from 'socket.io'
import jwt from 'jsonwebtoken'
import { errors } from 'com'
import { Match } from 'dat'
import mongoose from 'mongoose'

const { AuthorizationError, SystemError, NotFoundError } = errors

export default function setupSocket(server) {
    const io = new Server(server, {
        cors: {
            origin: [`http://${process.env.VITE_APP_URL}`, `http://${process.env.VITE_API_URL}`], // Allow both frontend and potentially API origin if needed
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

        // Handle Typing Indicator Events
        socket.on('typing', ({ matchId }) => {
            if (matchId) {
                // Broadcast to others in the room that this user is typing
                socket.to(`match:${matchId}`).emit('typing', { userId, matchId })
            }
        })

        socket.on('stopTyping', ({ matchId }) => {
            if (matchId) {
                // Broadcast to others in the room that this user stopped typing
                socket.to(`match:${matchId}`).emit('stopTyping', { userId, matchId })
            }
        })

        // Handle Read Receipt Event
        socket.on('messagesRead', async ({ matchId, messageIds }) => {
            if (!matchId || !Array.isArray(messageIds) || messageIds.length === 0) {
                console.error('Invalid messagesRead event payload:', { matchId, messageIds })
                return
            }

            console.log(`Received messagesRead from ${userId} for match ${matchId}`, messageIds)

            try {
                // Update messages in the database - mark them as read by the current user
                const updateResult = await Match.updateOne(
                    { _id: matchId, users: userId }, // Ensure user is part of the match
                    {
                        $addToSet: { // Add userId to readBy array if not already present
                            "messages.$[elem].readBy": userId
                        }
                    },
                    {
                        arrayFilters: [{ "elem._id": { $in: messageIds.map(id => new mongoose.Types.ObjectId(id)) } }], // Filter messages to update
                        multi: true // Although updateOne, needed for arrayFilters
                    }
                )

                if (updateResult.modifiedCount > 0) {
                    console.log(`Marked ${updateResult.modifiedCount} messages as read by ${userId} in match ${matchId}`)

                    // Notify others in the match room that messages were read
                    // Send the IDs of the messages that were marked as read by this user
                    socket.to(`match:${matchId}`).emit('messagesReadByOther', {
                        matchId,
                        readerId: userId,
                        messageIds // Send the original IDs back
                    })
                } else {
                    console.log(`No messages updated for read status by ${userId} in match ${matchId}. Maybe already read or match/user invalid?`, updateResult)
                }

            } catch (error) {
                console.error(`Error processing messagesRead event for match ${matchId} by user ${userId}:`, error)
                // Optionally emit an error back to the sender
                socket.emit('readReceiptError', { matchId, message: 'Failed to update read status.' })
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