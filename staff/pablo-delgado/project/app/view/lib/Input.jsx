export default function Input({ type, id, name, placeholder, className = '' }) {
    return (
        <input
            type={type}
            id={id}
            name={name}
            placeholder={placeholder}
            className={`w-full box-border border-[var(--color)] border-2 rounded-full shadow-md font-semibold px-4 py-2 ${className}`}
        />
    );
}
