import './Button.css'

export default ({ type, children, onClick, className }) => {
    return <button type={type} className={"Button " + className} onClick={onClick}>{children}</button>
}