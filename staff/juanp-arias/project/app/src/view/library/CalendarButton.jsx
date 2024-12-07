export default function CalendarButton({ type, children, onClick }) {
    return <button type={type} onClick={onClick} className='p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 min-w-14'>{children} </button>
}