export default function Button({ id, type, children, onClick, className }) {
    return <button id={id} type={type} onClick={onClick} className={className}> {children}</button>
}