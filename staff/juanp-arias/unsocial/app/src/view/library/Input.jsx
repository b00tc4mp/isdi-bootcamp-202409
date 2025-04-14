
export default function Input({ type, id, placeholder }) {
    return <input
        type={type}
        id={id}
        placeholder={placeholder}
        className="Input text-black w-full pl-1 bg-orange-100 h-8 rounded-md"
        required />
}
