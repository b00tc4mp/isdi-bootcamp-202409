import './Input.css'

export default function Input({ type, id, defaultValue }) {
    return <input type={type} id={id} className="Input" defaultValue={defaultValue} />
}