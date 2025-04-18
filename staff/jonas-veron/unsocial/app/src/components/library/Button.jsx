import './Button.css'


export default ({ type, className, children, onClick }) => {
    return <button type={type} className={className} onClick={onClick}>{children}</button>
}