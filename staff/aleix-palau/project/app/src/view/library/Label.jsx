export default function Label({ htmlFor, children }) {

    return <label
        htmlFor={htmlFor}
        className="w-full box-border"
    >{children}</label>
}