export default function Button({ type, children, onClick, className }) {

    console.log('Button -> render')
    return <button type={type} className={className} onClick={onClick}>{children}</button>
}