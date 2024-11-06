import './Input.css'

export default function Input({ type, id, autoComplete }) {
    return <input className="Input" id={id} type={type} autoComplete={autoComplete}></input>
}