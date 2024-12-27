import './Button.css'

export default function Button({ type, children, onClick }) {
    console.log('button -> render')

    return <button type={type} className={`Button ${theme === 'light' ? 'Button--light' : ''}`} onClick={onClick}>{children}</button>
}