import './Label.css'

export default ({ htmlFor, children }) => {
    return <label className="Label" htmlFor={htmlFor}>{children}</label>
}