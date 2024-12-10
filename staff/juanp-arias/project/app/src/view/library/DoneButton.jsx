export default function DoneButton({ type, children, onClick }) {
    return <button type={type} onClick={onClick} className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'>{children}</button>
}