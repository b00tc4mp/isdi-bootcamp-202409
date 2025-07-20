export default function CalendarButton({ type, children, onClick }) {
    return <button type={type} onClick={onClick} className='p-2 bg-blue-500 dark:bg-blue-700 text-white dark:text-gray-200 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-800 min-w-14'>{children}</button>
}