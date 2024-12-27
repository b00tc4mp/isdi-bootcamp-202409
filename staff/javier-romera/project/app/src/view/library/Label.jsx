export default function Label({ htmlFor, children, className }) {
    return <label className={className} htmlFor={htmlFor}>{children}</label>
}