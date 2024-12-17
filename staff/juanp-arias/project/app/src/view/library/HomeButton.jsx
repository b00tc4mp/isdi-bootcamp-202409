export default function HomeButton({ level = 'red', type, children, onClick }) {
    const backgroundColor = level === 'red' ? 'bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700'
        : level === 'yellow' ? 'bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700'
            : level === 'green' ? 'bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700'
                : level === 'blue' ? 'bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700' : ''
    return <button type={type} className={`py-3 rounded-lg shadow text-white ${backgroundColor}`} onClick={onClick}>{children}</button>
}