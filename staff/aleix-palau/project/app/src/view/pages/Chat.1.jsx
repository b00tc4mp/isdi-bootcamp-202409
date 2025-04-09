import { useState, useEffect, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useContext from '../useContext'
import { errors } from 'com'
import logic from '../../logic'
import { ChatList, Conversation } from '../components'
import { getSocket, connectSocket, joinMatchRoom, leaveMatchRoom } from '../../socket' // Import socket instance and connect function

const { SystemError } = errors

export default function Chat() {
    const { alert, confirm } = useContext() // Use confirm for unmatch
    const navigate = useNavigate()
    const { matchId } = useParams() // The currently viewed matchId from URL

    const [matches, setMatches] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [currentUser, setCurrentUser] = useState(null)
    const [notifications, setNotifications] = useState({}) // { matchId: count }
    const [errorState, setErrorState] = useState(null) // For displaying errors in UI

    // Fetch initial data (user profile and matches)
    const fetchInitialData = useCallback(() => {
        setIsLoading(true)
        setErrorState(null)
        Promise.all([logic.getUserProfile(), logic.getUserMatches()])
            .then(([profile, userMatches]) => {
                setCurrentUser(profile)
                // Sort matches initially by last activity
                const sortedMatches = userMatches.sort((a, b) =>
                    new Date(b.lastActivity) - new Date(a.lastActivity)
                )
                setMatches(sortedMatches)
                // Connect socket after getting user data
                connectSocket()
            })
            .catch(error => {
                console.error("Error fetching initial chat data:", error)
                setErrorState(error instanceof SystemError ? 'Could not load chat data. Please try again later.' : error.message)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [alert]) // Include alert in dependency array if used inside

    useEffect(() => {
        fetchInitialData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) // Fetch data only on initial mount

    // Socket.io event handlers
    useEffect(() => {
        const socket = getSocket()
        if (!socket || !currentUser) return // Only setup listeners if socket exists and user is loaded

        console.log("Setting up socket listeners for Chat component")

        // --- Listener Setup ---
        const handleNewMessage = message => {
            console.log('Received newMessage event:', message)
            if (!message || !message.matchId) {
                console.warn("Received invalid newMessage event payload")
                return
            }

            setMatches(prevMatches => {
                let matchFound = false
                const updatedMatches = prevMatches.map(match => {
                    if (match._id === message.matchId) {
                        matchFound = true
                        // Avoid adding duplicate messages if handler fires multiple times
                        const messageExists = match.messages.some(m => m._id === message._id)
                        if (!messageExists) {
                            // Add message and update lastActivity
                            return {
                                ...match,
                                messages: [...match.messages, message],
                                lastActivity: message.timestamp || new Date() // Use message timestamp if available
                            }
                        }
                    }
                    return match
                })

                if (!matchFound) {
                    // If match wasn't in the list (shouldn't happen often with newMatch), fetch it? Or ignore?
                    console.warn(`Received message for unknown matchId ${message.matchId}. Fetching matches again.`)
                    // Optionally re-fetch matches if a message arrives for an unknown match
                    // fetchInitialData() // Be careful with potential loops
                    return prevMatches // Return previous state for now
                }

                // Update notifications if the chat is not currently open
                if (matchId !== message.matchId && message.sender !== currentUser._id) {
                    setNotifications(prev => ({
                        ...prev,
                        [message.matchId]: (prev[message.matchId] || 0) + 1
                    }))
                }

                // Re-sort matches by last activity
                return updatedMatches.sort((a, b) =>
                    new Date(b.lastActivity) - new Date(a.lastActivity)
                )
            })
        }

        const handleNewMatch = newMatchData => {
            console.log('Received newMatch event:', newMatchData)
            if (!newMatchData || !newMatchData._id) {
                console.warn("Received invalid newMatch event payload")
                return
            }
            setMatches(prevMatches => {
                // Check if match already exists
                if (prevMatches.some(m => m._id === newMatchData._id)) {
                    return prevMatches // Already in the list
                }
                // Add new match to the beginning (or sort by date later)
                const updatedMatches = [newMatchData, ...prevMatches]
                // Re-sort matches by last activity/creation date
                return updatedMatches.sort((a, b) =>
                    new Date(b.lastActivity || b.createdAt) - new Date(a.lastActivity || a.createdAt)
                )
            })
            // Maybe show a success alert for the new match
            alert(`You matched with ${newMatchData.users?.find(u => u._id !== currentUser._id)?.name || 'someone'}!`, 'success', 'New Match!')
        }

        const handleUnmatch = ({ matchId: unmatchedMatchId, initiatedBy }) => {
            console.log(`Received unmatch event for match ${unmatchedMatchId} initiated by ${initiatedBy}`)
            setMatches(prevMatches =>
                prevMatches.filter(match => match._id !== unmatchedMatchId)
            )
            // If the user is currently viewing the unmatched chat, navigate back
            if (matchId === unmatchedMatchId) {
                alert('This match was removed.', 'warn', 'Match Removed')
                navigate('/chat')
            } else if (initiatedBy !== currentUser._id) {
                // Optionally notify if the *other* user unmatched
                // Find the match to get the name
                const unmatchedMatch = matches.find(m => m._id === unmatchedMatchId)
                const partnerName = unmatchedMatch?.users?.find(u => u._id !== currentUser._id)?.name || 'The other user'
                alert(`${partnerName} has unmatched.`, 'warn', 'Match Removed')
            }
        }

        const handleMessagesRead = ({ matchId: readMatchId, readerId, messageIds }) => {
            console.log(`Received messagesReadByOther for match ${readMatchId} by ${readerId}`)
            if (readerId === currentUser._id) return // Ignore if it's own read event

            setMatches(prevMatches =>
                prevMatches.map(match => {
                    if (match._id === readMatchId) {
                        const updatedMessages = match.messages.map(msg => {
                            // Check if this message ID is one that was read
                            if (messageIds.includes(msg._id)) {
                                // Add the readerId to the readBy array if not already present
                                const alreadyRead = msg.readBy?.includes(readerId)
                                return {
                                    ...msg,
                                    readBy: alreadyRead ? msg.readBy : [...(msg.readBy || []), readerId]
                                }
                            }
                            return msg
                        })
                        return { ...match, messages: updatedMessages }
                    }
                    return match
                })
            )
        }

        // Register listeners
        socket.on('newMessage', handleNewMessage)
        socket.on('newMatch', handleNewMatch)
        socket.on('unmatch', handleUnmatch) // Listen for unmatch events
        socket.on('messagesReadByOther', handleMessagesRead) // Listen for read receipts from others

        // --- Cleanup ---
        return () => {
            console.log("Cleaning up Chat component socket listeners")
            socket.off('newMessage', handleNewMessage)
            socket.off('newMatch', handleNewMatch)
            socket.off('unmatch', handleUnmatch)
            socket.off('messagesReadByOther', handleMessagesRead)
        }
    }, [currentUser, navigate, matchId, alert, matches]) // Dependencies

    // Clear notifications and join room when entering a specific conversation
    useEffect(() => {
        if (matchId) {
            // Clear notifications for the viewed chat
            setNotifications(prev => {
                if (prev[matchId] > 0) {
                    return { ...prev, [matchId]: 0 }
                }
                return prev
            })
            // Join the socket room for this specific match
            joinMatchRoom(matchId)
        }

        // Cleanup: leave room when navigating away from a specific chat
        return () => {
            if (matchId) {
                leaveMatchRoom(matchId)
            }
        }
    }, [matchId]) // Re-run when matchId changes

    // --- Action Handlers ---

    const handleSendMessage = (text, targetMatchId) => {
        if (!text.trim()) return // Basic validation

        // Optimistic UI update (optional but good UX)
        // You could add the message locally with a 'sending' status
        // then update it when the 'newMessage' event comes back

        logic.sendMessage(targetMatchId, text)
            // No need to manually add message here if 'newMessage' listener works reliably
            .catch(error => {
                console.error("Error sending message:", error)
                // Revert optimistic update if it failed
                alert(error instanceof SystemError ? 'Failed to send message. Please try again.' : error.message, 'error', 'Send Error')
            })
    }

    const handleUnmatch = (targetMatchId) => {
        // Find the match partner's name for the confirmation dialog
        const matchToUnmatch = matches.find(m => m._id === targetMatchId)
        const partner = matchToUnmatch?.users.find(user => user._id !== currentUser?._id)
        const partnerName = partner?.name || 'this user'

        confirm(
            `This will permanently delete your conversation with ${partnerName}. You won't be able to message them again unless you match again.`,
            (confirmed) => {
                if (confirmed) {
                    setIsLoading(true) // Show loading state while unmatching
                    logic.unmatchUser(targetMatchId)
                        .then(() => {
                            // No need to manually remove match if 'unmatch' listener works
                            // However, immediate removal provides faster feedback:
                            setMatches(prevMatches =>
                                prevMatches.filter(match => match._id !== targetMatchId)
                            )
                            alert(`You unmatched ${partnerName}.`, 'success', 'Unmatched')
                            // Navigate back to chat list if we were viewing this conversation
                            if (matchId === targetMatchId) {
                                navigate('/chat')
                            }
                        })
                        .catch(error => {
                            console.error("Error unmatching user:", error)
                            alert(error instanceof SystemError ? 'Failed to unmatch. Please try again.' : error.message, 'error', 'Unmatch Error')
                        })
                        .finally(() => {
                            setIsLoading(false)
                        })
                }
            },
            'warn', // Use 'warn' level for confirmation
            `Unmatch with ${partnerName}?`
        )
    }

    const handleViewProfile = (userId) => {
        navigate(`/profile/${userId}`)
    }

    // --- Render Logic ---

    // Loading state
    if (isLoading && !currentUser) { // Show loading only during initial fetch
        return (
            <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink"></div>
                <span className="ml-3 text-dark-blue">Loading Chats...</span>
            </div>
        )
    }

    // Error state
    if (errorState) {
        return (
            <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                <div className="text-xl text-red-600 mb-4">Error</div>
                <div className="text-dark-blue mb-4">{errorState}</div>
                <button
                    onClick={fetchInitialData} // Allow retry
                    className="px-4 py-2 bg-pink text-dark-blue rounded-full font-semibold"
                >
                    Retry
                </button>
            </div>
        )
    }

    // If we have a match ID, show the conversation view
    if (matchId && currentUser) {
        const currentMatch = matches.find(m => m._id === matchId)

        if (!currentMatch) {
            // Handle case where the match isn't found (e.g., after unmatch/error)
            return (
                <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                    <div className="text-xl text-dark-blue mb-4">Conversation not found or removed.</div>
                    <button
                        onClick={() => navigate('/chat')}
                        className="px-4 py-2 bg-pink text-dark-blue rounded-full font-semibold"
                    >
                        Back to Messages
                    </button>
                </div>
            )
        }

        return (
            <Conversation
                match={currentMatch}
                currentUser={currentUser}
                onSendMessage={handleSendMessage}
                onUnmatch={handleUnmatch}
                onViewProfile={handleViewProfile}
                onBack={() => navigate('/chat')}
                isLoading={isLoading} // Pass loading state if needed by Conversation
            />
        )
    }

    // Otherwise, show the chat list view
    if (currentUser) {
        return (
            <ChatList
                matches={matches}
                currentUser={currentUser}
                notifications={notifications}
                onSelectMatch={(selectedMatchId) => navigate(`/chat/${selectedMatchId}`)}
            />
        )
    }

    // Fallback if currentUser is somehow null after loading/error checks
    return null
}