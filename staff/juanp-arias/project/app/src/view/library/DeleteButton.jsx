export default function DeleteButton({ type, children, onClick }) {
    return <button type={type} onClick={onClick} className='text-sm text-white bg-red-500 dark:bg-red-600 px-3 py-1 rounded-md hover:bg-red-600 dark:hover:bg-red-700 transition'>{children}</button>
}