export default function TagKO({ htmlFor, children }) {
    return <span htmlFor={htmlFor}
        className="inline-block bg-red-100 text-red-800 text-xs font-semibold rounded-full px-3 py-1">
        {children}</span>
}