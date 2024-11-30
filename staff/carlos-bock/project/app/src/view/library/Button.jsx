import './Button.css'

export default function Button({ type, children, theme, onClick }) {
    console.log('Button _> redner')

    return <button type={type} className={'Button'} onClick={onClick}>{children}</button>
}