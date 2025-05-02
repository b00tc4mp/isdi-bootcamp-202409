import { Loader2 } from 'lucide-react'

export default function RoundedButton({
    icon: Icon,
    onClick,
    disabled = false,
    isLoading = false,
    iconSize = 24,
    className = ''
}) {
    return (
        <button
            onClick={onClick}
            disabled={disabled || isLoading}
            className={`
                rounded-full
                shadow-md
                transition-transform
                active:scale-[.98]
                leading-snug
                outline-none
                ${className}
                ${disabled ? 'opacity-70' : ''}
            `}
        >
            {isLoading ? (
                <Loader2
                    size={iconSize}
                    className="animate-spin"
                />
            ) : (
                <Icon size={iconSize} />
            )}
        </button>
    )
}