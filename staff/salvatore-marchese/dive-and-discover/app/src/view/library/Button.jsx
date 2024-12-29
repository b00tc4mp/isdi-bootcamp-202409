export default function Button({ type, children, onClick }) {
    return (
        <button type={type} className="Button bg-[var(--color)] font-inherit text-[var(--back-color)] border-[var(--color)] border-solid rounded-md w-[200px] h-auto p-2 text-center whitespace-normal overflow-hidden text-ellipsis" onClick={onClick}>
            {children}
        </button>
    )
}
