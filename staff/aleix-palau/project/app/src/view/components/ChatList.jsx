import { formatMessageTime } from '../../util'
import { MessageCircle } from 'lucide-react'

export default function ChatList({ matches, currentUser, notifications, onSelectMatch }) {
    // Helper function to get the other user in a match
    const getMatchPartner = (match) => {
        if (!match.users || match.users.length < 2) return null
        return match.users.find(user => user._id !== currentUser._id)
    }

    // Helper function to get the last message or placeholder text
    const getLastMessage = (match) => {
        if (!match.messages || match.messages.length === 0) {
            return 'No messages yet'
        }

        const lastMessage = match.messages[match.messages.length - 1]

        // Check if the message is from current user
        const isCurrentUserMessage = lastMessage.sender === currentUser._id

        // Prefix with "You: " if it's from the current user
        const prefix = isCurrentUserMessage ? 'You: ' : ''

        // Truncate message if too long
        const maxLength = isCurrentUserMessage ? 20 : 24
        const text = lastMessage.text.length > maxLength
            ? lastMessage.text.substring(0, maxLength) + '...'
            : lastMessage.text

        return prefix + text
    }

    // If no matches, show empty state
    if (!matches || matches.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                <div className="w-20 h-20 rounded-full bg-skin flex items-center justify-center mb-5">
                    <MessageCircle size={36} className="text-dark-blue" />
                </div>
                <div className="text-xl font-bold text-dark-blue mb-2">No messages yet</div>
                <div className="text-dark-blue max-w-xs">
                    When you match with someone, you'll be able to message them here.
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-lg mx-auto bg-lightest h-full overflow-y-auto">
            <div className="p-4">
                <h1 className="text-2xl font-bold text-darkest-blue mb-5">Messages</h1>

                <div className="space-y-2">
                    {matches.map(match => {
                        const partner = getMatchPartner(match)
                        if (!partner) return null

                        const lastMessage = match.messages.length > 0 ? match.messages[match.messages.length - 1] : null
                        const unreadCount = notifications[match._id] || 0

                        return (
                            <div
                                key={match._id}
                                onClick={() => onSelectMatch(match._id)}
                                className="flex items-center p-3 bg-skin rounded-xl cursor-pointer active:bg-light transition-colors"
                            >
                                {/* Profile Picture */}
                                <div className="relative">
                                    <img
                                        src={partner.profilePicture || '/images/default-profile.jpg'}
                                        alt={partner.name}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />

                                    {/* Notification Badge */}
                                    {unreadCount > 0 && (
                                        <div className="absolute -top-1 -right-1 bg-pink text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                                            {unreadCount > 9 ? '9+' : unreadCount}
                                        </div>
                                    )}
                                </div>

                                {/* Message Info */}
                                <div className="ml-3 flex-grow overflow-hidden">
                                    <div className="flex justify-between items-center">
                                        <h3 className="font-semibold text-darkest-blue">{partner.name}</h3>
                                        {lastMessage && (
                                            <span className="text-xs text-dark-blue">
                                                {formatMessageTime(lastMessage.timestamp)}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-dark-blue truncate">
                                        {getLastMessage(match)}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}