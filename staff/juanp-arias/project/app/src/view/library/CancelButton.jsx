export default function CancelButton({ type, children, onClick }) {
    return <button type={type} onClick={onClick} className='bg-gray-200 dark:bg-gray-700 text-blue-900 dark:text-blue-300 px-4 py-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600'>{children}</button>
}