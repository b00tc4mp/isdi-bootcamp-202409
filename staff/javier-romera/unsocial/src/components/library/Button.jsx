import './Button.css'

function Button({ type, children, onClick, classname }) {
    return <button type={type} onClick={onClick} className={"Button " + classname}> {children}</button >
}

export default Button