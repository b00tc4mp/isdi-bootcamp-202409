export default function Alert({ message, level = 'error', onAccepted }) {
    const bgColor = level === 'error' ? 'bg-red-200' : level === 'warn' ? 'bg-yellow-200' : 'bg-green-200'
    const borderColor = level === 'error' ? 'border-red-500' : level === 'warn' ? 'border-yellow-500' : 'border-green-500'
    const textColor = level === 'error' ? 'text-red-800' : level === 'warn' ? 'text-yellow-800' : 'text-green-800'

    const handleAcceptClick = () => onAccepted()

    return <div className={`fixed ${bgColor} px-6 py-4 my-4 rounded-md text-lg flex items-center mx-auto max-w-lg right-2`}>
        <svg viewBox="0 0 24 24" className={`${borderColor} w-5 h-5 sm:w-5 sm:h-5 mr-3`}>
            <path fill="currentColor"
                d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z">
            </path>
        </svg>
        <span className={`${textColor}`}>{message}</span>
        <span className="inline" onClick={handleAcceptClick}>
            <svg className="fill-current h-6 w-6" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <title>Close</title>
                <path
                    d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
        </span>
    </div>


}