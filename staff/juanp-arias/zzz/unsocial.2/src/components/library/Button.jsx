import './Button.css'

export default ({ type, children, onClick }) =>
    <button type={type} className="Button" onClick={onClick}>{children}</button>
