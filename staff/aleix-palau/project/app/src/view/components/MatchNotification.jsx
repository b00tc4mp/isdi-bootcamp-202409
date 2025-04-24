import { MessageCircle } from 'lucide-react'
import { PrimaryButton } from '../library'

export default function MatchNotification({ match, onClose, onStartChat }) {
    if (!match || !match.user) return null

    const { name, profilePicture } = match.user

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50" onClick={onClose}>
            <div
                className="w-full max-w-md mx-4 bg-lightest rounded-xl shadow-xl overflow-hidden flex flex-col p-6 text-center"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="mx-auto mb-4">
                    <img
                        src="/images/match-hearts.png"
                        alt="Match icon"
                        className="w-24 h-24"
                    />
                </div>

                <h2 className="text-2xl font-bold text-darkest-blue mb-4">
                    It's a match!
                </h2>

                <p className="text-dark-blue mb-6">
                    You and {name} both liked each other.
                </p>

                <div className="mb-6">
                    <img
                        src={profilePicture}
                        alt={`${name}'s profile`}
                        className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-pink"
                    />
                </div>

                <div className="space-y-3">
                    <PrimaryButton onClick={onStartChat}>
                        <MessageCircle size={20} className="mr-2" />
                        Start Chatting
                    </PrimaryButton>

                    <button
                        onClick={onClose}
                        className="w-full py-3 text-dark-blue font-semibold"
                    >
                        Keep Browsing
                    </button>
                </div>
            </div>
        </div>
    )
}
// TODO: edit or delete