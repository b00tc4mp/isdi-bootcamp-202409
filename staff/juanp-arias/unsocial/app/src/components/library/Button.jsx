import './Button.css'

export default function Button({ type, children, onClick }) {
    return <button type={type} className="Button" onClick={onClick}>{children}</button>
}