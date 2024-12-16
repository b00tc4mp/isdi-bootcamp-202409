export default function ReminderButton({ level = 'red', type, children, onClick }) {
    const backgroundColor = level === 'blue' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-red-500 hover:bg-red-600'
    return <button type={type} className={`text-xs text-white  px-3 py-1 rounded-md transition ${backgroundColor}`} onClick={onClick}>{children}</button>
}