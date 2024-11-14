import './Input.css'

export default function Input({ type, id, placeholder }) {
    return <input type={type} id={id} placeholder={placeholder} className="Input" required />
}
