import './Label.css'

export default function Label({ htmlFor, children }) {
    return <label className="Label" htmlFor={htmlFor}>{children}</label>
}