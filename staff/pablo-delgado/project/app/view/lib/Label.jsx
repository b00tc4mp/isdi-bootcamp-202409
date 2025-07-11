import './Label.css'

export default function Label({ htmlFor, children }) {
    return <label htmlFor={htmlFor} className="Label">{children}</label>
}