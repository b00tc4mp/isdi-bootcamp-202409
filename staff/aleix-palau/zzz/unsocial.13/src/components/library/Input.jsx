import './Input.css'

function Input({ type, id }) {
    const className = type === 'password' ? 'Input password-input' : 'Input' // Logic for normal and password inputs.
    return <input type={type} id={id} className={className} />
}

export default Input