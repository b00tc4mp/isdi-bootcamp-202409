import { memo } from 'react'
import { formatMessageTime } from '../../util'

// Using React.memo to prevent re-renders when props haven't changed
const MessageBubble = memo(function MessageBubble({ message, timestamp, isSentByCurrentUser, isOptimistic = false }) {
    const formattedTime = formatMessageTime(timestamp)

    return (
        <div className={`flex mb-2 ${isSentByCurrentUser ? 'justify-end' : 'justify-start'}`}>
            <div
                className={`
                    relative px-4 py-2 rounded-2xl max-w-[80%] break-words break-all flex items-end gap-x-2
                    ${isSentByCurrentUser
                        ? 'bg-pink text-dark-blue rounded-br-none'
                        : 'bg-skin text-dark-blue rounded-bl-none'}
                    ${isOptimistic ? 'opacity-70' : ''}
                `}
            >
                <span>{message}</span>
                <span className="text-xs opacity-75 whitespace-nowrap pt-1">
                    {isOptimistic ? 'Sending...' : formattedTime}
                </span>
            </div>
        </div>
    )
})

export default MessageBubble