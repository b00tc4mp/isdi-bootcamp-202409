export default function CancelButton({ type, children, onClick }) {
    return <button type={type} onClick={onClick} className='bg-gray-200 text-blue-900 px-4 py-2 rounded-md hover:bg-gray-300'>{children}</button>
}