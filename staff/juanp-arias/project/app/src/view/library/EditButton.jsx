export default function EditButton({ type, children, onClick }) {
    return <button type={type} onClick={onClick} className='text-sm text-white bg-yellow-500 px-3 py-1 rounded-md hover:bg-yellow-600 transition'>{children}</button>
}