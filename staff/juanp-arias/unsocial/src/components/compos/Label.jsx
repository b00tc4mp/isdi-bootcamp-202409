import './Label.css'

function Label({ htmlFor, children }) {
    return <label hmtlFor={htmlFor} className="Label">{children}</label>
}

export default Label