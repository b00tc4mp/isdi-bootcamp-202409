export default function EditButton({ type, children, onClick }) {
    return <button type={type} onClick={onClick} className='text-sm text-white bg-yellow-500 dark:bg-yellow-600 px-3 py-1 rounded-md hover:bg-yellow-600 dark:hover:bg-yellow-700 transition'>{children}</button>
}