import './label.css'

//export default ({ htmlFor, children }) => {
export default function Label({ htmlFor, children }) {
    return <label htmlFor={htmlFor}
        className="Label w-full box-border text-white">
        {children}</label>
}