import { useState, useEffect, useCallback, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useContext from '../useContext'
// import { errors } from 'com' // TODO
import logic from '../../logic'
import { ChatList, Conversation, UserDetail, NoConversation, Spinner } from '../components'
import { useNotifications } from '../../contexts/NotificationContext'

// const { SystemError } = errors

// Separate loading states to prevent unnecessary UI updates
const useLoadingStates = () => {
    const [states, setStates] = useState({
        initialLoading: true,
        sendingMessage: false,
        unmatchingUser: false
    })

    const setLoading = (key, value) => {
        setStates(prev => ({ ...prev, [key]: value }))
    }

    return [states, setLoading]
}

// Match sorting with memoization
const useSortedMatches = matches => {
    return useMemo(() => {
        if (!Array.isArray(matches)) return []
        return [...matches].sort((a, b) => {
            const dateA = new Date(b.lastActivity || b.createdAt || 0)
            const dateB = new Date(a.lastActivity || a.createdAt || 0)
            return dateA - dateB
        })
    }, [matches])
}

export default function Chat({ onChatClick }) {
    const { alert, confirm } = useContext()
    const navigate = useNavigate()
    const { matchId } = useParams()
    const { unreadMatches, markMatchAsRead, registerMessageListener } = useNotifications()

    const [loadingStates, setLoading] = useLoadingStates()
    const [matches, setMatches] = useState([])
    const [currentUser, setCurrentUser] = useState(null)
    const [viewingProfile, setViewingProfile] = useState(null)

    const sortedMatches = useSortedMatches(matches)
    const currentUserId = useMemo(() => currentUser?._id, [currentUser])

    // Message sending with local state updates
    const handleSendMessage = useCallback((text, targetMatchId) => {
        if (!text || !currentUser) return

        const tempMessage = {
            _id: `temp_${Date.now()}`,
            sender: currentUser._id,
            text,
            timestamp: new Date().toISOString(),
            isOptimistic: true
        }

        // Update matches with optimistic message
        setMatches(prev => {
            const updated = prev.map(match => {
                if (match._id !== targetMatchId) return match
                return {
                    ...match,
                    messages: [...match.messages, tempMessage],
                    lastActivity: tempMessage.timestamp
                }
            })
            return updated
        })

        // Send actual message
        logic.sendMessage(targetMatchId, text)
            .then(sentMessage => {
                setMatches(prev => {
                    const updated = prev.map(match => {
                        if (match._id !== targetMatchId) return match
                        return {
                            ...match,
                            messages: match.messages.map(m =>
                                m._id === tempMessage._id ? sentMessage : m
                            ),
                            lastActivity: sentMessage.timestamp
                        }
                    })
                    return updated
                })
            })
            .catch(error => {
                alert(error.message)
                console.error(error)

                // Remove optimistic message on error
                setMatches(prev => {
                    const updated = prev.map(match => {
                        if (match._id !== targetMatchId) return match
                        return {
                            ...match,
                            messages: match.messages.filter(m => m._id !== tempMessage._id)
                        }
                    })
                    return updated
                })
            })
    }, [currentUser, alert])

    // Unmatch handling
    const handleUnmatch = useCallback(targetMatchId => {
        const match = matches.find(m => m._id === targetMatchId)
        const partner = match?.users.find(u => u?._id !== currentUser?._id)
        const partnerName = partner?.name

        confirm(
            `You won't be able to message ${partnerName} unless you match again.`,
            confirmed => {
                if (!confirmed) return

                setLoading('unmatchingUser', true)
                logic.unmatchUser(targetMatchId)
                    .then(() => {
                        // Mark match as read before removing it
                        if (unreadMatches[targetMatchId]) {
                            return markMatchAsRead(targetMatchId)
                        }
                        return Promise.resolve()
                    })
                    .then(() => {
                        setMatches(prev => prev.filter(m => m._id !== targetMatchId))
                        if (matchId === targetMatchId) navigate('/chat')
                        alert(null, 'success', `You unmatched ${partnerName}`)
                    })
                    .catch(error => {
                        alert(error.message)
                        console.error(error)
                    })
                    .finally(() => {
                        setLoading('unmatchingUser', false)
                    })
            },
            'warn',
            `Unmatch with ${partnerName}?`
        )
    }, [matches, currentUser, matchId, navigate, confirm, alert, setLoading, unreadMatches, markMatchAsRead])

    // Initial data loading
    useEffect(() => {
        let mounted = true

        const loadInitialData = () => {
            Promise.all([logic.getUserProfile(), logic.getUserMatches()])
                .then(([profile, userMatches]) => {
                    if (!mounted) return

                    setCurrentUser(profile)
                    setMatches(userMatches || [])
                })
                .catch(error => {
                    if (!mounted) return
                    alert(error.message)
                    console.error(error)
                })
                .finally(() => {
                    if (mounted)
                        setLoading('initialLoading', false)
                })
        }
        loadInitialData()

        return () => { mounted = false }
    }, [alert, setLoading])

    // Real-time message handling
    useEffect(() => {
        if (!currentUserId) return

        const handleNewMessage = message => {
            if (!message?.matchId || message.sender === currentUserId) return

            setMatches(prev => {
                const matchIndex = prev.findIndex(m => m._id === message.matchId)
                if (matchIndex === -1) return prev

                const updated = [...prev]
                const match = { ...updated[matchIndex] }

                // Prevent duplicate messages
                if (match.messages.some(m => m._id === message._id)) return prev

                match.messages = [...match.messages, message]
                match.lastActivity = message.timestamp
                updated[matchIndex] = match

                return updated
            })
        }

        const unregister = registerMessageListener(handleNewMessage)
        return unregister
    }, [currentUserId, registerMessageListener])

    // Mark messages as read
    useEffect(() => {
        if (matchId && currentUser && unreadMatches[matchId]) {
            markMatchAsRead(matchId)
        }
    }, [matchId, currentUser, unreadMatches, markMatchAsRead])

    // Highlight common artists in Chat's UserDetail
    const handleViewProfile = partnerData => {
        if (partnerData && currentUser?.artists && Array.isArray(partnerData.artists)) {
            // Find the intersection (common artists)
            const commonArtists = partnerData.artists.filter(artist => currentUser.artists.includes(artist))
            setViewingProfile({ ...partnerData, commonArtists })
        } else {
            // Show profile without highlighting if data is incomplete
            setViewingProfile(partnerData) // Show profile anyway, but highlighting won't work
        }
    }

    // Render Logic
    if (loadingStates.initialLoading && !currentUser) return <Spinner />

    if (viewingProfile && currentUser) {
        return (
            <UserDetail
                user={viewingProfile}
                currentUser={currentUser}
                onBack={() => setViewingProfile(null)}
            />
        )
    }

    if (matchId && currentUser) {
        const currentMatch = matches.find(m => m._id === matchId)

        if (!currentMatch) return <NoConversation onChatClick={onChatClick} />

        return (
            <Conversation
                match={currentMatch}
                currentUser={currentUser}
                onSendMessage={handleSendMessage}
                onUnmatch={handleUnmatch}
                onViewProfile={handleViewProfile}
                onBack={() => navigate('/chat')}
                isUnmatching={loadingStates.unmatchingUser}
            />
        )
    }

    return (
        <ChatList
            matches={sortedMatches}
            currentUser={currentUser}
            notifications={unreadMatches}
            onSelectMatch={id => navigate(`/chat/${id}`)}
        />
    )
}