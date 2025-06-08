export default function Checkbox({
    id,
    value,
    checked,
    onChange,
    children,
    disabled = false,
    className = ''
}) {
    return (
        <label
            htmlFor={id}
            className={`
                flex
                items-center
                p-3
                mb-2
                bg-lightest
                border-2
                ${checked ? 'border-pink bg-pink/15' : 'border-skin'}
                rounded-lg
                transition-all
                ${disabled ? 'opacity-60' : ''}
                ${className}
            `}
        >
            <input
                type="checkbox"
                id={id}
                value={value}
                checked={checked}
                onChange={onChange}
                disabled={disabled}
                className="w-4 h-4 accent-light-blue"
            />
            <span className="ml-2 text-dark-blue select-none">
                {children}
            </span>
        </label>
    )
}