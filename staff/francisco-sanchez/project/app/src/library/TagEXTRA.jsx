export default function TagEXTRA({ htmlFor, children }) {
    return <span htmlFor={htmlFor}
        className="inline-block bg-purple-100 text-purple-800 text-xs font-semibold rounded-full px-3 py-1">
        {children}</span>
}