import { memo, useMemo } from 'react'
import { formatMessageTime } from '../../util'

// Memoized chat item component to prevent unnecessary re-renders. Only re-renders when its props change
const ChatItem = memo(function ChatItem({ match, currentUser, unreadCount, onSelect }) {
    // Find partner - memoized to avoid recalculation on every render
    const partner = useMemo(() => {
        if (!match.users || !Array.isArray(match.users) || match.users.length < 2) return null

        return match.users.find(user => user._id !== currentUser._id)
    }, [match.users, currentUser._id])

    // If no partner found, don't render anything
    if (!partner) return null

    // Calculate last message info - memoized to avoid recalculation
    const lastMessageInfo = useMemo(() => {
        if (!match.messages || !Array.isArray(match.messages) || match.messages.length === 0)
            return { text: 'No messages yet', timestamp: null }

        const lastMessage = match.messages[match.messages.length - 1]

        // Handle potentially malformed message
        if (!lastMessage || !lastMessage.text)
            return { text: 'No messages yet', timestamp: null }

        const isCurrentUserMessage = lastMessage.sender === currentUser._id
        const prefix = isCurrentUserMessage ? 'You: ' : ''
        const maxLength = isCurrentUserMessage ? 20 : 24
        const text = lastMessage.text.length > maxLength
            ? lastMessage.text.substring(0, maxLength) + '...'
            : lastMessage.text

        return {
            text: prefix + text,
            timestamp: lastMessage.timestamp
        }
    }, [match.messages, currentUser._id])

    return (
        <div
            onClick={() => onSelect(match._id)}
            className="flex items-center p-3 bg-skin rounded-xl transition-transform active:scale-[.98]"
        >
            {/* Profile Picture */}
            <div className="relative">
                <img
                    src={partner.profilePicture || '/images/default-profile.jpeg'}
                    alt={partner.name}
                    className="w-12 h-12 rounded-full object-cover"
                />

                {/* Notification Badge */}
                {unreadCount > 0 && (
                    <div className="absolute -top-1 -right-1 bg-light-blue text-lightest rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                        {unreadCount}
                    </div>
                )}
            </div>

            {/* Message Info */}
            <div className="ml-3 flex-grow overflow-hidden">
                <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-dark-blue">{partner.name}</h3>
                    {lastMessageInfo.timestamp && (
                        <span className="text-xs font-semibold text-dark-blue">
                            {formatMessageTime(lastMessageInfo.timestamp)}
                        </span>
                    )}
                </div>
                <p className="text-sm text-dark-blue truncate">
                    {lastMessageInfo.text}
                </p>
            </div>
        </div>
    )
})

export default ChatItem