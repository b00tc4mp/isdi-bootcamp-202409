export default function DoneButton({ type, children, onClick }) {
    return <button type={type} onClick={onClick} className='bg-blue-500 dark:bg-blue-700 text-white dark:text-gray-200 px-4 py-2 rounded-md hover:bg-blue-600 dark:hover:bg-blue-800'>{children}</button>
}