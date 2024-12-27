export default function Button({ id, type, children, onClick, className, disabled }) {
    return <button id={id} type={type} onClick={onClick} className={className} disabled={disabled}>{children}</button>
}