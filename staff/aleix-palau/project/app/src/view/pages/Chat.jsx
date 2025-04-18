import { useState, useEffect, useCallback, useMemo } from 'react'
import { useNavigate, useParams, Navigate } from 'react-router-dom'
import useContext from '../useContext' // For alert/confirm
import { errors } from 'com'
import logic from '../../logic'
import { ChatList, Conversation, UserDetail, NoConversation, Spinner } from '../components'
import { useNotifications } from '../../contexts/NotificationContext' // Import notification hook

const { SystemError } = errors

// Helper function for sorting matches
const sortMatches = (matches) => {
    if (!Array.isArray(matches)) return [] // Handle non-array input
    // Create a new array before sorting to avoid mutating the original
    return [...matches].sort((a, b) =>
        new Date(b.lastActivity || b.createdAt || 0) - new Date(a.lastActivity || a.createdAt || 0)
    );
};

// Removed onChatClick prop unless specifically needed for something else
export default function Chat({ onChatClick }) {
    const { alert, confirm } = useContext() // Still needed for local actions
    const navigate = useNavigate()
    const { matchId } = useParams() // The currently viewed matchId from URL
    // Use context state and functions directly
    const {
        unreadMatches,
        markMatchAsRead,
        registerMessageListener,
        unregisterMessageListener
    } = useNotifications()

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

    // Effect to mark chat as read when entering conversation view AND it's marked unread in context
    useEffect(() => {
        // Check if viewing a specific match and if that match has unread messages in context
        if (matchId && currentUser && unreadMatches[matchId] > 0) {
            console.log(`Viewing match ${matchId} which has unread messages, marking as read...`)
            markMatchAsRead(matchId) // Call context function
        }
        // Dependencies: matchId, currentUser (to ensure user context is loaded),
        // markMatchAsRead function, and the specific unread count for this matchId.
    }, [matchId, currentUser, markMatchAsRead, unreadMatches])

    // --- NEW Effect: Listen for real-time messages via Context ---
    useEffect(() => {
        // Define the listener function
        const handleRealtimeMessage = (newMessage) => {
            console.log('Chat.jsx received real-time message:', newMessage);
            setMatches(prevMatches => {
                let matchFound = false;
                const updatedMatches = prevMatches.map(match => {
                    if (match._id === newMessage.matchId) {
                        matchFound = true;
                        // Avoid adding duplicate messages if optimistic update already added it
                        // (though optimistic should be replaced anyway)
                        // A simple check might be by timestamp or a temporary ID if you used one.
                        // If backend returns the final message ID, we don't need complex checks.
                        // Just make sure the message isn't already present.
                        const messageExists = match.messages.some(m => m._id === newMessage._id);
                        return {
                            ...match,
                            // Add message only if it doesn't exist
                            messages: messageExists ? match.messages : [...match.messages, newMessage],
                            // Always update lastActivity
                            lastActivity: newMessage.timestamp,
                        };
                    }
                    return match;
                });

                // If the match wasn't already in the list (edge case?), maybe fetch it?
                // For now, we assume the match exists if a message arrives for it.
                if (!matchFound) {
                    console.warn(`Received message for match ${newMessage.matchId}, but match not found in local state.`);
                    // Optionally trigger a refetch? fetchInitialData();
                    return prevMatches; // Return previous state if match not found
                }

                return sortMatches(updatedMatches); // Re-sort after adding the message
            });
        };

        // Register the listener when component mounts
        registerMessageListener(handleRealtimeMessage);

        // Unregister the listener when component unmounts
        return () => {
            unregisterMessageListener(handleRealtimeMessage);
        };
        // Dependencies: registration functions (should be stable)
    }, [registerMessageListener, unregisterMessageListener]);
    // --- End Real-time Listener Effect ---

    // --- Action Handlers ---

    // handleSendMessage - Largely unchanged, ensure sorting happens
    const handleSendMessage = (text, targetMatchId) => {
        if (!text.trim() || !currentUser) return
        const tempMessageId = `temp_${Date.now()}`
        const optimisticMessage = {
            _id: tempMessageId, // Use temporary ID
            sender: currentUser._id,
            text: text.trim(),
            timestamp: new Date().toISOString(), // Use ISO string for consistency
            isOptimistic: true // Flag for potential styling/handling
        }

        // Update local state optimistically and re-sort
        setMatches(prevMatches => {
            const updatedMatches = prevMatches.map(match => {
                if (match._id === targetMatchId) {
                    return {
                        ...match,
                        messages: [...match.messages, optimisticMessage],
                        lastActivity: optimisticMessage.timestamp,
                    }
                }
                return match
            })
            return sortMatches(updatedMatches)
        })

        logic.sendMessage(targetMatchId, text)
            .then(sentMessage => {
                // Replace optimistic message and re-sort
                setMatches(prevMatches => {
                    const updatedMatches = prevMatches.map(match => {
                        if (match._id === targetMatchId) {
                            return {
                                ...match,
                                messages: match.messages.map(m =>
                                    m._id === tempMessageId ? { ...sentMessage, isOptimistic: false } : m
                                ),
                                lastActivity: sentMessage.timestamp,
                            }
                        }
                        return match
                    })
                    return sortMatches(updatedMatches)
                })
            })
            .catch(error => {
                alert(error.message)
                console.error("Send message error:", error)
                // Remove optimistic message and re-sort
                setMatches(prevMatches => {
                    const updatedMatches = prevMatches.map(match => {
                        if (match._id === targetMatchId) {
                            return {
                                ...match,
                                messages: match.messages.filter(m => m._id !== tempMessageId)
                            }
                        }
                        return match
                    })
                    return sortMatches(updatedMatches)
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
                                console.log('Unmatch successful, updating matches. Previous count:', prevMatches.length);
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
        if (isLoading) return <Spinner />;

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