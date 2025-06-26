import { Loader2 } from 'lucide-react'

export default function RoundedButton({
    type = 'button',
    icon: Icon,
    onClick,
    disabled = false,
    isLoading = false,
    iconSize = 24,
    className = ''
}) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || isLoading}
            className={`
                flex
                items-center
                justify-center
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