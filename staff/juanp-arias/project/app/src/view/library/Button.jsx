export default function Button({ type, children, onClick }) {
    return <button type={type} onClick={onClick} className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition">{children} </button>
}