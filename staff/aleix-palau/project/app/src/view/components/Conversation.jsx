import { useState, useRef, useEffect } from 'react'
import { formatFullDate } from '../../util'
import { ChevronLeft, Send, X, Loader2 } from 'lucide-react'
import useContext from '../useContext'
import { MessageBubble } from '../library'

export default function Conversation({ match, currentUser, onSendMessage, onUnmatch, onViewProfile, onBack }) {
    const { confirm } = useContext()
    const [message, setMessage] = useState('')
    const [groupedMessages, setGroupedMessages] = useState([])
    const [isSending, setIsSending] = useState(false) // Loading state for sending message
    const messagesEndRef = useRef(null)
    const textareaRef = useRef(null) // Ref for textarea auto-resize

    // Find the match partner (the other user)
    const partner = match.users.find(user => user._id !== currentUser._id)

    useEffect(() => {
        // Focus the textarea when the component mounts or the specific match changes
        textareaRef.current?.focus()
    }, [match._id]) // Depend on match._id to refocus if the viewed conversation changes

    useEffect(() => {
        // Focus the textarea when isSending changes from true to false
        if (isSending === false) {
            textareaRef.current?.focus();
        }
    }, [isSending]) // This will run when isSending changes

    const handleInputChange = e => {
        setMessage(e.target.value)
        autoResizeTextarea() // Auto-resize textarea
    }

    // Group messages by date for displaying date headers
    useEffect(() => {
        const groups = []
        let currentDate = null

        match.messages.forEach(msg => {
            const messageDate = new Date(msg.timestamp)
            const dateStr = messageDate.toISOString().split('T')[0] // Format: 'YYYY-MM-DD'

            if (dateStr !== currentDate) {
                currentDate = dateStr
                groups.push({ date: messageDate, messages: [] }) // Add new group
            }

            // Add message to the last group
            if (groups.length > 0) {
                groups[groups.length - 1].messages.push(msg)
            }
        })
        setGroupedMessages(groups)
    }, [match.messages])

    // Scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [groupedMessages])

    // Auto-resize textarea height
    const autoResizeTextarea = () => {
        const textarea = textareaRef.current
        if (textarea) {
            textarea.style.height = 'auto' // Reset height
            const scrollHeight = textarea.scrollHeight
            const maxHeight = 96 // Example: 96px for max-h-24 (6rem)
            textarea.style.height = `${Math.min(scrollHeight, maxHeight)}px`
        }
    }

    // Adjust height initially and on message change (in case content is loaded)
    useEffect(() => {
        autoResizeTextarea()
    }, [message])

    const handleSend = () => {
        const textToSend = message.trim()
        if (!textToSend || isSending) return // Prevent sending empty or during sending

        setIsSending(true) // Set loading state
        setMessage('') // Clear input immediately
        requestAnimationFrame(autoResizeTextarea) // Reset textarea height after clearing

        // Use the callback from props -> Call the parent function to actually send the message
        onSendMessage(textToSend, match._id)

        // Simulate async operation finish - remove this when using real API feedback
        // In a real app, `isSending` would be set to false in the parent component
        // based on the success/failure callback or socket event confirmation.
        // For now, reset after a short delay for demo purposes.
        setTimeout(() => setIsSending(false), 100) // Reset sending state (adjust as needed)
    }

    const handleKeyPress = e => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault() // Prevent newline
            handleSend()
        }
    }

    const handleUnmatchConfirm = () => {
        // Use the callback from props
        onUnmatch(match._id)
    }

    const handleUnmatchClick = () => {
        confirm(
            `This will permanently delete your conversation and you won't be able to message ${partner.name} again unless you match again.`,
            (confirmed) => {
                if (confirmed) {
                    handleUnmatchConfirm()
                }
            },
            'warn',
            `Unmatch with ${partner.name}?`
        )
    }

    if (!partner) {
        // Handle case where partner data might be missing
        return (
            <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                <div className="text-xl text-dark-blue mb-4">Error displaying conversation partner.</div>
                <button
                    onClick={onBack}
                    className="px-4 py-2 bg-pink text-dark-blue rounded-full font-semibold"
                >
                    Back to Messages
                </button>
            </div>
        )
    }

    return (
        <div className="flex flex-col h-full bg-lightest max-h-screen"> {/* Ensure container takes full height */}
            {/* Conversation Header */}
            <div className="flex-shrink-0 flex items-center justify-between p-3 bg-lightest border-b border-skin">
                <button onClick={onBack} className="p-1 active:bg-skin rounded-full">
                    <ChevronLeft size={24} className="text-pink" />
                </button>

                <div className="flex flex-col items-center cursor-pointer" onClick={() => onViewProfile(partner)}>
                    <img
                        src={partner.profilePicture || partner.pictures?.[0] || '/images/default-profile.jpg'} // Added fallback
                        alt={partner.name}
                        className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="font-semibold text-sm text-darkest-blue mt-1">{partner.name}</span>
                </div>

                <div className="flex">
                    <button onClick={handleUnmatchClick} className="p-2 text-pink active:bg-skin rounded-full">
                        <X size={20} />
                    </button>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-grow overflow-y-auto p-4 bg-lightest"> {/* Ensure this area scrolls */}
                {groupedMessages.map((group, groupIndex) => (
                    <div key={groupIndex} className="mb-4">
                        {/* Date Header */}
                        <div className="flex justify-center mb-3">
                            <div className="px-3 py-1 bg-skin text-dark-blue text-xs rounded-full">
                                {formatFullDate(group.date)}
                            </div>
                        </div>

                        {/* Messages */}
                        {group.messages.map((msg, msgIndex) => {
                            if (!msg || !msg.sender) return null // Basic check for invalid message data

                            const isCurrentUser = msg.sender === currentUser._id

                            // Determine if time should be shown (last message in group OR next message is from different sender)
                            const isLastMessageInGroup = msgIndex === group.messages.length - 1
                            const nextMessage = !isLastMessageInGroup ? group.messages[msgIndex + 1] : null
                            const showTime = isLastMessageInGroup || nextMessage?.sender !== msg.sender

                            return (
                                <MessageBubble
                                    key={msg._id || `msg-${groupIndex}-${msgIndex}`} // Use msg._id if available
                                    message={msg.text}
                                    timestamp={msg.timestamp}
                                    isSentByCurrentUser={isCurrentUser}
                                    showTime={showTime}
                                />
                            )
                        })}
                    </div>
                ))}

                {/* Empty state if no messages */}
                {match.messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-center p-4">
                        <div className="text-dark-blue mb-2">Say hello to {partner.name}!</div>
                        <div className="text-sm text-dark-blue opacity-70">
                            This is the beginning of your conversation. Be nice :)
                        </div>
                    </div>
                )}

                {/* Element to scroll to */}
                <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="flex-shrink-0 p-3 border-t border-skin bg-lightest">
                <div className="flex items-end bg-skin rounded-full px-4 py-2"> {/* items-end to align button nicely with multi-line text */}
                    <textarea
                        ref={textareaRef}
                        value={message}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        placeholder="Type a message..."
                        className="flex-grow bg-transparent border-none focus:ring-0 resize-none m-0 p-0 outline-none text-dark-blue placeholder-dark-blue/60 overflow-y-auto" // Basic styling, adjust as needed
                        rows="1" // Start with single row
                        disabled={isSending} // Disable while sending
                        style={{ maxHeight: '96px' }} // Corresponds to max-h-24 Tailwind class
                    />
                    <button
                        onClick={handleSend}
                        disabled={!message.trim() || isSending} // Disable if empty or sending
                        className={`ml-2 p-2 rounded-full flex-shrink-0 ${message.trim() && !isSending ? 'text-pink' : 'text-dark-blue opacity-50'}`}
                    >
                        {isSending ? (
                            <Loader2 size={20} className="animate-spin" /> // Loading spinner
                        ) : (
                            <Send size={20} />
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}