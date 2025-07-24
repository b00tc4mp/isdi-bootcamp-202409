import './Button.css'

export default function Button({ type, children, theme, onClick }) {
    return <button type={type} className={`Button ${theme === 'light' ? 'Button--light' : ''}`} onClick={onClick}>{children}</button>
}