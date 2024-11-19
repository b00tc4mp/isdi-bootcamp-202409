import './Anchor.css'

export default function Anchor({ type, children, onClick, className }) {
    return <a type={type} className={"Anchor " + className} onClick={onClick}>{children}</a>
}