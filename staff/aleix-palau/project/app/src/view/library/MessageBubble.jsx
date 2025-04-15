import { formatMessageTime } from '../../util'

export default function MessageBubble({ message, timestamp, isSentByCurrentUser }) {
    const formattedTime = formatMessageTime(timestamp)

    return (
        <div className={`flex mb-2 ${isSentByCurrentUser ? 'justify-end' : 'justify-start'}`}>
            <div
                className={`
                    relative px-4 py-2 rounded-2xl max-w-[80%] break-words flex items-end gap-x-2
                    ${isSentByCurrentUser
                        ? 'bg-pink text-dark-blue rounded-br-none'
                        : 'bg-skin text-dark-blue rounded-bl-none'}
                `}
            >
                <span>{message}</span>
                {/* Time display integrated into the bubble */}
                <span className="text-xs opacity-75 whitespace-nowrap pt-1">
                    {formattedTime}
                </span>
            </div>
        </div>
    )
}