import './Label.css'

function Label({ htmlFor, children }) {
    return <label htmlFor={htmlFor} className="Label">{children}<input placeholder="username" type="text" id="username"  /></label>
}

export default Label