import './Anchor.css'

function Anchor({ href, onClick, children }) {

    return <a className="Anchor" href={href} onClick={onClick}>{children}</a>

}

export default Anchor