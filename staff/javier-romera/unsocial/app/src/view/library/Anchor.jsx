import './Anchor.css'

export default function Anchor({ href, onClick, children }) {
    return <a className="Anchor" href={href} onClick={onClick}>{children}</a>
}