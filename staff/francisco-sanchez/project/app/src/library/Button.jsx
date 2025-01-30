export default function Button({ type, children, onClick, className = '' }) {

    return <button
        type={type}
        className={`w-[15em] h-16 bg-color_darkBlue text-white text-lg font-medium py-2 px-6 m-3 max-w-96 rounded-full border-2 border-black hover:bg-color_lightBlue transition-all duration-200 ${className}`}
        onClick={onClick}>{children}</button>
}