import './Button.css'

function Button({ type, className, children, onClick }) {
    return <button type={type} className={className} onClick={onClick}>{children}</button>
}

export default Button