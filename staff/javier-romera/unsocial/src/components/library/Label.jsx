import './Label.css'

function Label({ htmlFor, children }) {
    return <label className="Label" htmlFor={htmlFor}>{children}</label>
}

export default Label