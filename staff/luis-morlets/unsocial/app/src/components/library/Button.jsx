import './Button.css'

export default function Button({ type, children, onClick, className }) {

    console.log('Button -> render')
    return <button type={type} className={"Button" + className} onClick={onClick}>{children}</button>
}