export default function Confirm({ message = null, title = null, level = 'error', onAccepted, onCancelled }) {
    const levelStyle = {
        error: {
            border: 'border-red-500',
            confirmButton: 'bg-red-500 active:bg-red-700',
            cancelButton: 'bg-gray-500 active:bg-gray-700'
        },
        warn: {
            border: 'border-yellow-500',
            confirmButton: 'bg-yellow-500 active:bg-yellow-700',
            cancelButton: 'bg-gray-500 active:bg-gray-700'
        },
        success: {
            border: 'border-green-500',
            confirmButton: 'bg-green-500 active:bg-green-700',
            cancelButton: 'bg-gray-500 active:bg-gray-700'
        }
    }

    const style = levelStyle[level] || levelStyle.error

    const handleAcceptClick = () => onAccepted && onAccepted()
    const handleCancelClick = () => onCancelled && onCancelled()

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className={`bg-lightest rounded-lg shadow-xl ${style.border} border-l-8 max-w-md w-full mx-12`}>
                <div className="p-5">
                    {title && <h2 className="text-gray-800 text-lg/6 font-semibold mb-1">{title}</h2>}

                    {message && <p className="text-gray-600 whitespace-pre-line mb-2">{message}</p>}

                    <div className="flex justify-end space-x-2">
                        <button className={`px-3 py-2 text-white rounded-lg ${!message ? 'mt-2' : 'mt-1'} ${style.confirmButton}`} onClick={handleAcceptClick}>Confirm</button>
                        <button className={`px-3 py-2 text-white rounded-lg ${!message ? 'mt-2' : 'mt-1'} ${style.cancelButton}`} onClick={handleCancelClick}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}