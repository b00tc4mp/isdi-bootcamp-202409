import './Input.css'

export default function Input({ type, id }) {
    //console.log('Input -> render')

    const className = type === 'password' ? 'Input password-input' : 'Input'
    return <input type={type} id={id} className={className} />
}