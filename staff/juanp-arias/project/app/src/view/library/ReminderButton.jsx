export default function ReminderButton({ level = 'red', type, children, onClick }) {
    const backgroundColor = level === 'blue' ? 'bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700' : 'bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700'
    return <button type={type} className={`text-xs text-white px-3 py-1 rounded-md transition ${backgroundColor}`} onClick={onClick}> {children}</button>
}