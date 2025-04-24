import { useState, useEffect, useCallback, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useContext from '../useContext'
import { errors } from 'com'
import logic from '../../logic'
import { ChatList, Conversation, UserDetail, NoConversation, Spinner } from '../components'
import { useNotifications } from '../../contexts/NotificationContext'

const { SystemError } = errors

// Helper function for sorting matches
const sortMatches = matches => {
    if (!Array.isArray(matches)) return [] // Handle non-array input
    // Create a new array before sorting to avoid mutating the original
    return [...matches].sort((a, b) =>
        new Date(b.lastActivity || b.createdAt || 0) - new Date(a.lastActivity || a.createdAt || 0)
    )
}

export default function Chat({ onChatClick }) {
    const { alert, confirm } = useContext() // Still needed for local actions
    const navigate = useNavigate()
    const { matchId } = useParams() // The currently viewed matchId from URL
    // Use context state and functions directly
    const { unreadMatches, markMatchAsRead, registerMessageListener } = useNotifications()

    const [matches, setMatches] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [currentUser, setCurrentUser] = useState(null)
    const [viewingProfile, setViewingProfile] = useState(null)

    const currentUserId = useMemo(() => currentUser?._id, [currentUser])

    // Fetch initial data (user profile and matches)
    const fetchInitialData = useCallback(() => {
        // Reset loading state only when starting fetch
        setIsLoading(true)
        Promise.all([
            logic.getUserProfile().catch(err => { console.error("Failed to get user profile:", err); return null }),
            logic.getUserMatches().catch(err => { console.error("Failed to get user matches:", err); return [] })
        ])
            .then(([profile, userMatches]) => {
                setCurrentUser(profile) // Set profile (might be null if error)
                setMatches(sortMatches(userMatches || []))
            })
            .catch(error => { // Catch errors from Promise.all itself
                alert(error.message)
                console.error(error)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [alert]) // alert is a stable dependency from useContext

    // Initial fetch on mount
    useEffect(() => {
        fetchInitialData()
    }, [fetchInitialData])

    // Effect to mark messages as read when viewing a conversation
    useEffect(() => {
        if (matchId && currentUser && unreadMatches[matchId]) {
            // Only call markMatchAsRead if there are actually unread messages
            markMatchAsRead(matchId)
        }
    }, [matchId, currentUser, unreadMatches, markMatchAsRead])

    // Real-time message handling
    useEffect(() => {
        // If not logged in or no current user, don't set up listeners
        if (!currentUser?._id) return

        const handleRealtimeMessage = newMessage => {
            // Skip invalid messages or own messages
            if (!newMessage?.matchId || newMessage.sender === currentUser._id) {
                return
            }

            setMatches(prevMatches => {
                // Find the match this message belongs to
                const matchIndex = prevMatches.findIndex(m => m._id === newMessage.matchId)

                // If match not found in our local state, no update needed
                // (could happen if new match was created but local state hasn't updated)
                if (matchIndex === -1) {
                    console.log(`Received message for match ${newMessage.matchId} not in local state`)
                    return prevMatches
                }

                // Create a new array to avoid mutating state
                const updatedMatches = [...prevMatches]
                const match = { ...updatedMatches[matchIndex] }

                // Don't add duplicate messages (check by ID)
                const isDuplicate = match.messages.some(m => m._id === newMessage._id)
                if (!isDuplicate) {
                    match.messages = [...match.messages, newMessage]
                    match.lastActivity = newMessage.timestamp
                    updatedMatches[matchIndex] = match
                }

                // Return sorted matches - handles conversation ordering in list view
                return sortMatches(updatedMatches)
            })
        }

        // Register for message updates and store the unregister function
        const unregisterMessageListener = registerMessageListener(handleRealtimeMessage)

        // Clean up on unmount
        return unregisterMessageListener
    }, [currentUser, registerMessageListener])

    // Message sending with cleaner optimistic updates
    const handleSendMessage = (text, targetMatchId) => {
        if (!text.trim() || !currentUser) return

        // Create temporary message with unique ID
        const tempMessageId = `temp_${Date.now()}`
        const optimisticMessage = {
            _id: tempMessageId,
            sender: currentUser._id,
            text: text.trim(),
            timestamp: new Date().toISOString(),
            isOptimistic: true // Flag for potential styling
        }

        // Update state optimistically in a single operation
        setMatches(prevMatches => {
            return sortMatches(prevMatches.map(match => {
                if (match._id === targetMatchId) {
                    return {
                        ...match,
                        messages: [...match.messages, optimisticMessage],
                        lastActivity: optimisticMessage.timestamp
                    }
                }
                return match
            }))
        })

        // Send the actual message
        logic.sendMessage(targetMatchId, text)
            .then(sentMessage => {
                // Replace optimistic message with real one
                setMatches(prevMatches => {
                    return sortMatches(prevMatches.map(match => {
                        if (match._id === targetMatchId) {
                            return {
                                ...match,
                                messages: match.messages.map(m =>
                                    m._id === tempMessageId ? { ...sentMessage } : m
                                ),
                                lastActivity: sentMessage.timestamp
                            }
                        }
                        return match
                    }))
                })
            })
            .catch(error => {
                alert(error.message)
                console.error("Send message error:", error)

                // Remove optimistic message on error
                setMatches(prevMatches => {
                    return sortMatches(prevMatches.map(match => {
                        if (match._id === targetMatchId) {
                            return {
                                ...match,
                                messages: match.messages.filter(m => m._id !== tempMessageId)
                            }
                        }
                        return match
                    }))
                })
            })
    }

    // handleUnmatch - Unchanged, context listener handles unread count cleanup
    const handleUnmatch = targetMatchId => {
        // Find the match partner's name for the confirmation dialog
        const matchToUnmatch = matches.find(m => m._id === targetMatchId)
        const partner = matchToUnmatch?.users.find(user => user?._id !== currentUser?._id)
        const partnerName = partner?.name || 'this user'

        confirm(
            `This will permanently delete your conversation and you won't be able to message ${partnerName} unless you match again.`,
            confirmed => {
                if (confirmed) {
                    setIsLoading(true) // Show loading state while unmatching
                    logic.unmatchUser(targetMatchId)
                        .then(() => {
                            // Filter and then sort the remaining
                            setMatches(prevMatches => {
                                // prevMatches IS DEFINED HERE as the argument
                                console.log('Unmatch successful, updating matches. Previous count:', prevMatches.length)
                                return sortMatches(prevMatches.filter(match => match._id !== targetMatchId))
                            })

                            // The global unmatch listener in context should handle unread counts
                            alert(`You unmatched ${partnerName}.`, 'success', 'Unmatched')
                            // Navigate back to chat list if we were viewing this conversation
                            if (matchId === targetMatchId) {
                                navigate('/chat')
                            }
                        }).catch(error => {
                            alert(error.message)
                            console.error(error)
                        })
                        .finally(() => {
                            setIsLoading(false)
                        })
                }
            },
            'warn',
            `Unmatch with ${partnerName}?`
        )
    }
    // handleViewProfile - Unchanged
    const handleViewProfile = partnerData => { // highlight common artists in UserDetail from Chat
        if (partnerData && currentUser?.artists && Array.isArray(partnerData.artists)) {
            // Find the intersection (common artists)
            const commonArtists = partnerData.artists.filter(artist => currentUser.artists.includes(artist))
            setViewingProfile({ ...partnerData, commonArtists })
        } else {
            // Show profile without highlighting if data is incomplete
            setViewingProfile(partnerData) // Show profile anyway, but highlighting won't work
        }
    }
    // handleBackFromProfile - Unchanged
    const handleBackFromProfile = () => {
        setViewingProfile(null) // Clear the viewing state to return
        // Optionally navigate back to the specific chat if we came from there
    }

    // --- Render Logic ---

    // Initial loading state
    if (isLoading && !currentUser) return <Spinner />

    // Viewing Profile State - unchanged
    if (viewingProfile && currentUser) {
        return (
            <UserDetail
                user={viewingProfile}
                currentUser={currentUser}
                onBack={handleBackFromProfile} // Pass the function to go back
            />
        )
    }
    // Viewing Conversation State
    if (matchId && currentUser) {
        const currentMatch = matches.find(m => m._id === matchId)

        // Important: Check isLoading *before* assuming match not found
        if (isLoading) return <Spinner />

        if (!currentMatch) {
            // Match not found (e.g., after unmatch, invalid ID, or still loading initial data)
            // Navigate back or show a 'not found' message. Showing list is safer.
            console.warn(`Match with ID ${matchId} not found. Navigating to /chat`)
            // Use Navigate component for declarative redirect
            return <NoConversation onChatClick={onChatClick} />
        }

        // Render Conversation if match found (currentMatch is guaranteed here)
        return (
            <Conversation
                key={matchId} // Key ensures component remounts if matchId changes
                match={currentMatch} // Pass the potentially updated match object
                currentUser={currentUser}
                onSendMessage={handleSendMessage}
                onUnmatch={handleUnmatch}
                onViewProfile={handleViewProfile}
                onBack={() => navigate('/chat')}
            />
        )
    }

    // Default: Chat List View
    // Ensure currentUser is loaded before rendering ChatList
    if (!isLoading && currentUser) {
        return (
            <ChatList
                matches={matches}
                currentUser={currentUser}
                // Pass unreadMatches directly from context
                notifications={unreadMatches} // Use state from context
                onSelectMatch={selectedMatchId => {
                    setViewingProfile(null)
                    navigate(`/chat/${selectedMatchId}`)
                }}
            />
        )
    }

    // Fallback spinner if currentUser isn't loaded yet but not in initial loading phase
    return <Spinner />
}