export default function Button({ type, children, onClick }) {
    // console.log('Button -> render')

    return <button
        type={type}
        className="bg-blue-800 text-white text-lg font-medium py-2 px-6 m-3 max-w-96 rounded-full border-2 border-black hover:bg-blue-700 transition-all duration-200"
        onClick={onClick}>{children}</button>
}