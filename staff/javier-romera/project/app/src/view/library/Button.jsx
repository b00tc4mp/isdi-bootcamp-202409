export default function Button({ type, children, onClick, className }) {
    return <button type={type} onClick={onClick} className={className}> {children}</button>
}