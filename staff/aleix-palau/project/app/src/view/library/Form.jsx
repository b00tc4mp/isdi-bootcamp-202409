export default function Form({ children, onSubmit, className = '' }) {
    return (
        <form
            className={`w-full ${className}`}
            onSubmit={onSubmit}
        >
            {children}
        </form>
    )
}