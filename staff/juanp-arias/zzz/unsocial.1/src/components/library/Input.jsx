import './Input.css'

function Input({ type, id, placeholder }) {
    return <input type={type} id={id} placeholder={placeholder} className="Input" />
}
export default Input