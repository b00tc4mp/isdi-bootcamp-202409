import { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import { ChevronLeft, Send, UserRoundX } from 'lucide-react'
import { MessageBubble, IconButton } from '../library'
import { useAutoResizeTextarea } from '../../hooks'
import { formatFullDate } from '../../util'

// Group messages by date for displaying date headers. Memoized to avoid expensive recalculation
const useGroupedMessages = messages => {
    return useMemo(() => {
        if (!Array.isArray(messages)) return []

        const groups = []
        let currentDate = null

        messages.forEach(msg => {
            if (!msg?.timestamp) return

            const messageDate = new Date(msg.timestamp)
            if (isNaN(messageDate.getTime())) return

            const displayDateStr = formatFullDate(messageDate)

            if (displayDateStr !== currentDate) {
                currentDate = displayDateStr
                groups.push({
                    date: messageDate,
                    displayDate: displayDateStr,
                    messages: []
                })
            }

            // Add message to the last group
            groups[groups.length - 1].messages.push(msg)
        })

        return groups
    }, [messages])
}

export default function Conversation({ match, currentUser, onSendMessage, onUnmatch, onViewProfile, onBack, isUnmatching }) {
    const [message, setMessage] = useState('')
    const [isSending, setIsSending] = useState(false)
    const [shouldScrollToBottom, setShouldScrollToBottom] = useState(true)
    const messagesEndRef = useRef(null)
    const messageContainerRef = useRef(null)
    const { textareaRef } = useAutoResizeTextarea(message, 96)
    const previousMessagesLength = useRef(match?.messages?.length || 0)

    // Find the match partner (the other user). Memoized the finding to avoid recalculation on every render
    const partner = useMemo(() => {
        if (!match?.users || !Array.isArray(match.users) || !currentUser?._id) return {}

        return match.users.find(user => user?._id !== currentUser._id) || {}
    }, [match?.users, currentUser?._id])

    const groupedMessages = useGroupedMessages(match?.messages)

    const scrollToBottom = useCallback((behavior = 'auto') => {
        if (!messagesEndRef.current || !shouldScrollToBottom) return

        messagesEndRef.current.scrollIntoView({ behavior, block: 'end' })
    }, [shouldScrollToBottom])

    const handleScroll = useCallback(() => {
        if (!messageContainerRef.current) return

        const { scrollTop, scrollHeight, clientHeight } = messageContainerRef.current
        const isNearBottom = scrollHeight - scrollTop - clientHeight < 100
        setShouldScrollToBottom(isNearBottom)
    }, [])

    useEffect(() => {
        const currentMessagesLength = match?.messages?.length || 0
        const hasNewMessages = currentMessagesLength > previousMessagesLength.current

        if (hasNewMessages) scrollToBottom('smooth')

        previousMessagesLength.current = currentMessagesLength
    }, [match?.messages, scrollToBottom])

    // Initial scroll
    useEffect(() => {
        scrollToBottom()
    }, [])

    const handleSend = useCallback(() => {
        const textToSend = message
        if (!textToSend || isSending) return

        setIsSending(true)
        setMessage('')
        setShouldScrollToBottom(true)

        return Promise.resolve()
            .then(() => onSendMessage(textToSend, match._id))
            .then(() => {
                scrollToBottom('smooth')
            })
            .catch(error => {
                alert(error.message)
                console.error(error)
            })
            .finally(() => {
                setIsSending(false)
                textareaRef.current?.focus()
            })
    }, [message, isSending, match?._id, onSendMessage, textareaRef, scrollToBottom])

    const handleKeyPress = useCallback(e => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }, [handleSend])

    // Auto-focus textarea on mount and after sending
    useEffect(() => {
        if (!isSending && textareaRef.current)
            textareaRef.current?.focus()
    }, [isSending, match?._id, textareaRef])

    return (
        <div className="flex flex-col h-full bg-lightest max-h-screen">
            {/* Conversation Header */}
            <div className="flex items-center justify-between py-3 px-5 bg-light">
                <div className="flex justify-start">
                    <IconButton
                        icon={ChevronLeft}
                        onClick={onBack}
                        className="text-pink scale-150"
                    />

                    <div
                        className="inline-flex items-center justify-center px-3 gap-1.5"
                        onClick={() => onViewProfile(partner)}
                    >
                        <img
                            src={partner.profilePicture || '/images/default-profile.jpeg'}
                            alt={partner.name}
                            className="w-9 h-9 rounded-full object-cover"
                        />
                        <span className="font-semibold text-dark-blue">{partner.name}</span>
                    </div>
                </div>

                <IconButton
                    icon={UserRoundX}
                    onClick={() => onUnmatch(match._id)}
                    disabled={isSending}
                    isLoading={isUnmatching}
                    iconSize={22}
                    className="text-pink"
                />
            </div>

            {/* Messages Area */}
            <div
                ref={messageContainerRef}
                onScroll={handleScroll}
                className="flex-grow overflow-y-auto px-4 bg-light"
            >
                {groupedMessages.map((group, groupIndex) => (
                    <div key={`${group.displayDate}-${groupIndex}`}>
                        {/* Date Header */}
                        <div className="flex justify-center mb-3">
                            <div className="px-2 py-1 bg-skin text-dark-blue text-xs rounded-md">
                                {group.displayDate}
                            </div>
                        </div>

                        {/* Messages */}
                        {group.messages.map(msg => (
                            <MessageBubble
                                key={msg._id || `msg-${msg.timestamp}`}
                                message={msg.text}
                                timestamp={msg.timestamp}
                                isSentByCurrentUser={msg.sender === currentUser._id}
                                isOptimistic={msg.isOptimistic}
                            />
                        ))}
                    </div>
                ))}

                {/* Empty state if no messages */}
                {(!match?.messages?.length) && (
                    <div className="flex flex-col items-center justify-center h-full text-center p-4">
                        <div className="text-dark-blue mb-2">Say hello to {partner.name}!</div>
                        <div className="text-sm text-dark-blue/70">
                            This is the beginning of your conversation. Be nice :)
                        </div>
                    </div>
                )}

                {/* Element to scroll to */}
                <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-3 bg-light">
                <div className="flex items-center bg-skin rounded-4xl px-4 py-2">
                    <textarea
                        ref={textareaRef}
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Message..."
                        className="flex-grow resize-none outline-none text-dark-blue placeholder-dark-blue/60"
                        rows="1"
                        disabled={isSending || isUnmatching}
                    />
                    <IconButton
                        icon={Send}
                        onClick={handleSend}
                        disabled={!message || isUnmatching}
                        isLoading={isSending}
                        iconSize={20}
                        className={`ml-2 p-2 ${message && !isSending ? 'text-pink' : 'text-dark-blue/50'}`}
                    />
                </div>
            </div>
        </div>
    )
}