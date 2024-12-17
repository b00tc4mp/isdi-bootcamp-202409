export default function TaskButton({ level = 'red', type, children, onClick }) {
    const backgroundColor = level === 'green' ? 'bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700' : 'bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700'
    return <button type={type} className={`text-white text-sm px-4 py-2 rounded-md transition ${backgroundColor}`} onClick={onClick}>{children}</button>
}