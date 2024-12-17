export default function Button({ type, children, onClick }) {
    return <button type={type} onClick={onClick} className='w-full bg-blue-500 dark:bg-blue-700 text-white dark:text-gray-200 py-3 rounded-lg font-medium hover:bg-blue-600 dark:hover:bg-blue-800 transition'>{children}</button>
}