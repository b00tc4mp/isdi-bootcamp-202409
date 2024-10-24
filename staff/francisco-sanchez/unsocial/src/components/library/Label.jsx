import './label.css'

export default ({ htmlFor, children }) => {
    return <label htmlFor={htmlFor} className="Label">{children}</label>
}