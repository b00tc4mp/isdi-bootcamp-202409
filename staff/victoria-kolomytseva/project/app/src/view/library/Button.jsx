import './Button.css'

export default function Button({ type, children, className, onClick }) {

    return <button type={type} className={`rounded-lg text-center py-2 ${className}`} onClick={onClick}>{children}</button>
}