export default function DeleteButton({ type, children, onClick }) {
    return <button type={type} onClick={onClick} className='text-sm text-white bg-red-500 px-3 py-1 rounded-md hover:bg-red-600 transition'>{children}</button>
}