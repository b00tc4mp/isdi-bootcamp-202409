import './Button.css'

export default ({ type, children, theme, onClick }) =>
    <button type={type} className={`Button ${theme === 'light' ? 'Button--light' : ''}`} onClick={onClick}>{children}</button>
