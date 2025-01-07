export default function HomeButton({ level = 'red', type, children, onClick }) {
    const backgroundColor = level === 'red' ? 'bg-orange-600 hover:bg-orange-700 dark:bg-orange-700 dark:hover:bg-orange-800'
        : level === 'yellow' ? 'bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700'
            : level === 'green' ? 'bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800'
                : level === 'blue' ? 'bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700' : ''
    return <button type={type} className={`py-3 rounded-lg shadow text-white ${backgroundColor}`} onClick={onClick}>{children}</button>
}