export default function Label({ htmlFor, children, className = '' }) {
    return (
        <label
            htmlFor={htmlFor}
            className={`
                block
                mb-2
                text-dark-blue
                font-medium
                ${className}
            `}
        >
            {children}
        </label>
    )
}