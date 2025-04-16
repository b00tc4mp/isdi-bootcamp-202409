import './Button.css'

//export default ({ type, children, onClick }) => {
export default function Button({ type, children, onClick }) {
    return <button type={type}
        className="Button w-full px-4 py-2 text-lg rounded-md cursor-pointer bg-amarilloCanario text-purple-900 border border-blue-900 hover:bg-yellow-600 transition duration-200"
        onClick={onClick}>{children}</button>
}