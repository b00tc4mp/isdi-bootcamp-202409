import './Button.css'

function Button({ type, children, onClick }) {
    return <button type={type} className="Button" onClick={onClick}>{children}</button>
}

export default Button
