import { formatMessageTime } from '../../util'
import { Check, CheckCheck } from 'lucide-react' // Import check icons

export default function MessageBubble({ message, timestamp, isSentByCurrentUser, showTime = true, isRead = false }) {
    const formattedTime = formatMessageTime(timestamp)

    return (
        <div className={`flex flex-col mb-2 ${isSentByCurrentUser ? 'items-end' : 'items-start'}`}>
            <div
                className={`
                    px-4 py-2 rounded-2xl max-w-[80%] break-words
                    ${isSentByCurrentUser
                        ? 'bg-pink text-darkest-blue rounded-br-none'
                        : 'bg-skin text-dark-blue rounded-bl-none'}
                `}
            >
                {message}
            </div>

            {showTime && (
                <div className="flex items-center text-xs text-dark-blue opacity-75 mt-1 mr-1">
                    <span>{formattedTime}</span>
                    {/* Show read receipt only for messages sent by the current user */}
                    {isSentByCurrentUser && (
                        <span className="ml-1">
                            {isRead ? <CheckCheck size={14} className="text-light-blue" /> : <Check size={14} />}
                        </span>
                    )}
                </div>
            )}
        </div>
    )
}