import './Label.css'

export default ({ htmlFor, children }) =>
    <label htmlFor={htmlFor} className="Label">{children}</label>


