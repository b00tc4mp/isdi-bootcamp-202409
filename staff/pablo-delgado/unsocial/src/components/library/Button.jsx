import './Button.css'

export default ({ type, children, theme, onClick }) => {
    console.log('Button -> render')

    return <button type={type} className={`Button ${theme === 'light' ? 'Button--light' : ''}`} onClick={onClick}>{children}</button>
}