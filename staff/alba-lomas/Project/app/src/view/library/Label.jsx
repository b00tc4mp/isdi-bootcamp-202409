


export default function Label({ htmlFor, children }) {

    return <label htmlFor={htmlFor} className="flex items-center justify-center ::before { content: '[' } ::after { content: ']' }">{children}</label>
}