import './Input.css'

export default function Input({ type, id, defaultValue }) {
    return <input
        type={type}
        id={id}
        className="Input text-blue-950 
        py-3 px-3 rounded h-full mb-5 w-full 
        font-inherit"
        defaultValue={defaultValue}
        required />
}