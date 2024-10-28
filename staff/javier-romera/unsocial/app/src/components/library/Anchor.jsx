import './Anchor.css'

export default ({ href, onClick, children }) => {
    return <a className="Anchor" href={href} onClick={onClick}>{children}</a>
}