export default function HomeButton({ level = 'red', type, children, onClick }) {
    const backgroundColor = level === 'red' ? 'bg-red-500 hover:bg-red-600' : level === 'yellow' ? 'bg-yellow-500 hover:bg-yellow-600' : level === 'green' ? 'bg-green-500 hover:bg-green-600' : level === 'blue' ? 'bg-blue-500 hover:bg-blue-600' : ''
    return <button type={type} className={`py-3 rounded-lg shadow ${backgroundColor}`} onClick={onClick}>{children}</button>
}