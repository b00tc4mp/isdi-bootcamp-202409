import './Label.css'

export default function Label({ htmlFor, children, className }) {

    return <label htmlFor={htmlFor} className={className}>{children}</label>
}