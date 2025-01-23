//export default ({ htmlFor, children }) => {
export default function Label({ htmlFor, children, personalClasses = '' }) {
    return <label htmlFor={htmlFor} className={`block text-sm font-medium text-gray-700 mb-1 ${personalClasses}`}>{children}</label>
}