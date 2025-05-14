import { PrimaryButton } from '../library'

export default function MatchNotification({ match, onClose, onStartChat, isProcessing = false }) {
    if (!match || !match.user) return null

    const { name, profilePicture } = match.user

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
            <div
                className="w-full max-w-xs mx-6 p-6 bg-lightest rounded-xl shadow-xl text-center"
                onClick={e => e.stopPropagation()}
            >
                <h2 className="text-2xl font-bold text-darkest-blue mb-2">It's a match!</h2>
                <p className="text-dark-blue mb-6">You and {name} both liked each other.</p>

                <div className="mb-6">
                    <img
                        src={profilePicture}
                        alt={`${name}'s profile`}
                        className="w-34 h-34 rounded-full object-cover mx-auto border-2 border-light-blue/50"
                    />
                </div>

                <div className="space-y-3">
                    <PrimaryButton
                        className="bg-pink"
                        onClick={onStartChat}
                        disabled={isProcessing}
                    >
                        Start Chatting
                    </PrimaryButton>

                    <PrimaryButton
                        className="bg-light"
                        onClick={onClose}
                        disabled={isProcessing}
                    >
                        Keep Browsing
                    </PrimaryButton>
                </div>
            </div>
        </div>
    )
}