import './Anchor.css'

function Anchor({ type, children, onClick }) {
    return <a type={type} className="Anchor" onClick={onClick}>{children}</a>
}

export default Anchor