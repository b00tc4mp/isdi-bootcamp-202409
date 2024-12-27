export default function Button({ type, children, onClick, classname }) {
    return <button type={type} onClick={onClick} className={classname}> {children}</button>
}