import { useMemo } from 'react'
import { NoMessages, ChatItem } from '../components'

export default function ChatList({ matches, currentUser, notifications, onSelectMatch }) {
    // Safe check for matches array validity
    const validMatches = useMemo(() => {
        if (!matches || !Array.isArray(matches)) return []
        return matches
    }, [matches])

    // If no valid matches, show empty state
    if (validMatches.length === 0)
        return <NoMessages />

    return (
        <div className="max-w-lg mx-auto bg-lightest h-full overflow-y-auto">
            <div className="p-3">
                <h1 className="text-2xl font-bold text-darkest-blue mb-5">Messages</h1>
                <div className="space-y-2">
                    {validMatches.map(match => (
                        <ChatItem
                            key={match._id}
                            match={match}
                            currentUser={currentUser}
                            unreadCount={notifications && notifications[match._id] || 0}
                            onSelect={onSelectMatch}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}