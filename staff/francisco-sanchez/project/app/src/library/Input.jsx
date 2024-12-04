export default function Input({ type, id, defaultValue, placeholder }) {
    return <input
        placeholder={placeholder}
        type={type}
        id={id}
        className="w-full py-2 px-3 text-blue-950 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-color_primary"
        defaultValue={defaultValue}
        required />
}