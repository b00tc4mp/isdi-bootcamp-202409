import './Button.css'

export default ({ type, children, onClick }) => {
    return <button type={type} className="Button" onClick={onClick}>{children}</button>
}