export default function Confirm({ message, level = 'error', onAccepted, onCancelled }) {
    const borderColor =
        level === 'error'
            ? 'border-red-600 dark:border-gray-700'
            : level === 'warn'
            ? 'border-yellow-600 dark:border-gray-700'
            : 'border-green-600 dark:border-gray-700'

    const backgroundColor =
        level === 'error'
            ? 'bg-red-100 dark:bg-gray-800'
            : level === 'warn'
            ? 'bg-yellow-100 dark:bg-gray-800'
            : 'bg-green-100 dark:bg-gray-800'

    const textColor = 'text-gray-800 dark:text-gray-300'

    const handleCancelClick = () => onCancelled()
    const handleAcceptClick = () => onAccepted()

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 dark:bg-opacity-70 z-50'>
            <div
                className={`min-w-[20rem] max-w-[40rem] min-h-[10rem] ${backgroundColor} ${borderColor} 
                            border rounded-lg shadow-lg flex flex-col items-center justify-center p-6 gap-6`}
            >
                <p className={`text-center font-medium text-lg ${textColor}`}>{message}</p>
                <div className='flex gap-4'>
                    <button
                        className='px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium transition-all
                                   dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200'
                        onClick={handleCancelClick}
                    >
                        Cancel
                    </button>
                    <button
                        className='px-6 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-100 font-medium transition-all'
                        onClick={handleAcceptClick}
                    >
                        Accept
                    </button>
                </div>
            </div>
        </div>
    )
}