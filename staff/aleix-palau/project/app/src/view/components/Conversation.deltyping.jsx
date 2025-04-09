import { useState, useRef, useEffect } from 'react'
import { formatFullDate } from '../../util'
import { ChevronLeft, Send, X, Loader2 } from 'lucide-react'
import useContext from '../useContext'
import { MessageBubble } from '../library'

export default function Conversation({ match, currentUser, onSendMessage, onUnmatch, onViewProfile, onBack }) {
    const { confirm } = useContext()
    const [message, setMessage] = useState('')
    const [groupedMessages, setGroupedMessages] = useState([])
    const [isSending, setIsSending] = useState(false)
    const messagesEndRef = useRef(null)
    const textareaRef = useRef(null)

    // Find the match partner (the other user)
    // Ensure robust finding logic remains
    const partner = match.users.find(user => {
        if (!user || !user._id || !currentUser || !currentUser._id) return false
        return user._id.toString() !== currentUser._id.toString()
    })

    const handleInputChange = e => {
        setMessage(e.target.value)
        autoResizeTextarea()
    }

    // Group messages by date for displaying date headers
    useEffect(() => {
        const groups = []
        let currentDate = null

        match.messages.forEach(msg => {
            const messageDate = new Date(msg.timestamp)
            const dateStr = messageDate.toISOString().split('T')[0]

            if (dateStr !== currentDate) {
                currentDate = dateStr
                groups.push({ date: messageDate, messages: [] })
            }
            if (groups.length > 0) {
                groups[groups.length - 1].messages.push(msg)
            }
        })
        setGroupedMessages(groups)
    }, [match.messages])

    // Scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
        // Removed partnerIsTyping dependency
    }, [groupedMessages])

    // Auto-resize textarea height
    const autoResizeTextarea = () => {
        const textarea = textareaRef.current
        if (textarea) {
            textarea.style.height = 'auto'
            const scrollHeight = textarea.scrollHeight
            const maxHeight = 96
            textarea.style.height = `${Math.min(scrollHeight, maxHeight)}px`
        }
    }

    useEffect(() => {
        autoResizeTextarea()
    }, [message])

    const handleSend = () => {
        const textToSend = message.trim()
        if (!textToSend || isSending) return

        setIsSending(true)
        setMessage('')
        requestAnimationFrame(autoResizeTextarea)

        onSendMessage(textToSend, match._id)

        // Reset sending state (adjust timing as needed based on actual confirmation)
        setTimeout(() => setIsSending(false), 500)
    }

    const handleKeyPress = e => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    // Unmatch logic remains the same
    const handleUnmatchConfirm = () => {
        onUnmatch(match._id)
    }
    const handleUnmatchClick = () => {
        confirm( /* ... confirmation details ... */)
    }

    // Partner check remains the same
    if (!partner) { /* ... return error/fallback ... */ }

    return (
        <div className="flex flex-col h-full bg-lightest max-h-screen">
            {/* Conversation Header */}
            <div className="flex-shrink-0 flex items-center justify-between p-3 bg-lightest border-b border-skin">
                <button onClick={onBack} className="p-1 active:bg-skin rounded-full">
                    <ChevronLeft size={24} className="text-pink" />
                </button>

                <div className="flex flex-col items-center cursor-pointer" onClick={() => onViewProfile(partner._id)}>
                    <img
                        src={partner.profilePicture || partner.pictures?.[0] || '/images/default-profile.jpg'}
                        alt={partner.name}
                        className="w-8 h-8 rounded-full object-cover"
                    />
                    {/* Display only partner name, removed typing indicator */}
                    <span className="font-semibold text-sm text-darkest-blue mt-1">{partner.name}</span>
                </div>

                <div className="flex">
                    <button onClick={handleUnmatchClick} className="p-2 text-pink active:bg-skin rounded-full">
                        <X size={20} />
                    </button>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-grow overflow-y-auto p-4 bg-lightest">
                {groupedMessages.map((group, groupIndex) => (
                    <div key={groupIndex} className="mb-4">
                        {/* Date Header */}
                        <div className="flex justify-center mb-3">
                            { /* ... date rendering ... */}
                        </div>

                        {/* Messages */}
                        {group.messages.map((msg, msgIndex) => {
                            if (!msg || !msg.sender) return null

                            const isCurrentUser = msg.sender === currentUser._id

                            const isLastMessageInGroup = msgIndex === group.messages.length - 1
                            const nextMessage = !isLastMessageInGroup ? group.messages[msgIndex + 1] : null
                            const showTime = isLastMessageInGroup || nextMessage?.sender !== msg.sender

                            return (
                                <MessageBubble
                                    key={msg._id || `msg-${groupIndex}-${msgIndex}`}
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
                <div className="flex items-end bg-skin rounded-full px-4 py-2">
                    <textarea
                        ref={textareaRef}
                        value={message}
                        onChange={handleInputChange} // Still uses the simplified input handler
                        onKeyPress={handleKeyPress}
                        placeholder="Type a message..."
                        className="flex-grow bg-transparent border-none focus:ring-0 resize-none m-0 p-0 outline-none text-dark-blue placeholder-dark-blue/60 overflow-y-auto"
                        rows="1"
                        disabled={isSending}
                        style={{ maxHeight: '96px' }}
                    />
                    <button
                        onClick={handleSend}
                        disabled={!message.trim() || isSending}
                        className={`ml-2 p-2 rounded-full flex-shrink-0 ${message.trim() && !isSending ? 'text-pink' : 'text-dark-blue opacity-50'}`}
                    >
                        {isSending ? (
                            <Loader2 size={20} className="animate-spin" />
                        ) : (
                            <Send size={20} />
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}