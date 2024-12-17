export default function Alert({ message, level = 'error', onAccepted }) {
    const borderColor = level === 'error' ? 'border-red-500' : level === 'warn' ? 'border-yellow-500' : 'border-green-500'
    const backgroundColor = level === 'error' ? 'bg-red-100' : level === 'warn' ? 'bg-yellow-100' : 'bg-green-100'
    const textColor = level === 'error' ? 'text-red-700' : level === 'warn' ? 'text-yellow-700' : 'text-green-700'

    const handleAcceptClick = () => onAccepted()

    return <div className='fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50'>
        <div className={`min-w-[20rem] max-w-[40rem] min-h-[10rem] ${backgroundColor} ${borderColor} border-4 rounded-lg shadow-lg flex flex-col items-center justify-center p-4 gap-4`}>
            <p className={`text-center font-semibold text-lg ${textColor}`}>{message}</p>
            <button className='px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all' onClick={handleAcceptClick}>Accept</button>
        </div>
    </div>
}