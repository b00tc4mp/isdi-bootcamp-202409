import { MessageCircleX } from 'lucide-react'
import { PrimaryButton } from '../library'

export default function NoConversation({ onChatClick }) {
    return (
        <div className="flex flex-col items-center justify-center p-6 text-center h-full">
            <div className="w-20 h-20 rounded-full bg-skin flex items-center justify-center mb-6">
                <MessageCircleX size={36} className="text-dark-blue" />
            </div>

            <h2 className="text-2xl font-bold text-dark-blue mb-8">
                Conversation not found
            </h2>

            <PrimaryButton onClick={onChatClick} className="max-w-3xs bg-pink">
                Go back to Chat
            </PrimaryButton>
        </div>
    )
}