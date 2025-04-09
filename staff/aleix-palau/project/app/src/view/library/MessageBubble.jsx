import { formatMessageTime } from '../../util'

export default function MessageBubble({ message, timestamp, isSentByCurrentUser, showTime = true }) {
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
                </div>
            )}
        </div>
    )
}