import './Button.css'

function Button({ type, children, onClick, className }) {
    return <button type={type} className={"Button" + className} onClick={onClick}>{children}</button>
}

export default Button