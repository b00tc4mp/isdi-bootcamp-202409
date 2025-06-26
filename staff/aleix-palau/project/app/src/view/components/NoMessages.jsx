import { MessageCircleOff } from 'lucide-react'

export default function NoMessages() {
    return (
        <div className="flex flex-col items-center justify-center p-6 text-center h-full">
            <div className="w-20 h-20 rounded-full bg-skin flex items-center justify-center mb-6">
                <MessageCircleOff size={36} className="text-dark-blue" />
            </div>

            <h2 className="text-2xl font-bold text-dark-blue mb-2">
                No messages yet
            </h2>

            <p className="text-dark-blue max-w-xs leading-snug">
                When you match with someone, you'll be able to message them here.
            </p>
        </div>
    )
}