


export default function Button({ type, children, onClick }) {

    return <button type={type} className="mb-4 bg-sky-700 text-white rounded-lg shadow-lg hover:bg-sky-800 border-b-2 border-gray-300 px-4 py-1" onClick={onClick}>{children}</button>
}