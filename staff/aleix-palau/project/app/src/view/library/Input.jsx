export default function Input({
    type = 'text',
    id,
    placeholder,
    disabled = false,
    required = false,
    max,
    className = ''
}) {
    return (
        <input
            type={type}
            id={id}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            max={max}
            className={`
                w-full
                p-3
                bg-lightest
                border-2
                border-skin
                rounded-lg
                text-dark-blue
                placeholder-dark-blue/50
                outline-none
                focus:border-pink
                transition-colors
                disabled:opacity-60
                ${className}
            `}
        />
    )
}