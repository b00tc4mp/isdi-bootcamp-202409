export default function TagOK({ htmlFor, children }) {
    return <span htmlFor={htmlFor}
        className="inline-block bg-green-100 text-green-800 text-xs font-semibold rounded-full px-3 py-1">
        {children}</span>
}