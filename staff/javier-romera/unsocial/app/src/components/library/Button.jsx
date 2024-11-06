import './Button.css'

export default function Button({ type, children, onClick, classname }) {
    return <button type={type} onClick={onClick} className={"Button " + classname}> {children}</button >
}