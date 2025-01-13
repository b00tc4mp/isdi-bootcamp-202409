export default function TagWARN({ htmlFor, children }) {
    return <span htmlFor={htmlFor}
        className="inline-block bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full px-3 py-1">
        {children}</span>
}