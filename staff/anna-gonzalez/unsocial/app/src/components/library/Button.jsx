import './Button.css'

export default ({ type, children, onClick, className }) => {
    //console.log('Button -> render')

    return <button type={type} className={"Button " + className} onClick={onClick}>{children}</button>
}