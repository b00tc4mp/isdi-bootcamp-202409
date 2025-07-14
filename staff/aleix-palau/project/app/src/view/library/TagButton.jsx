import { Loader2 } from 'lucide-react'

export default function TagButton({
    type = 'button',
    icon: Icon,
    onClick,
    disabled = false,
    isLoading = false,
    iconSize = 16,
    children,
    variant = 'light',
    className = ''
}) {
    // Color variants
    const variantClasses = {
        light: disabled ? 'bg-light/50 text-dark-blue/50' : 'bg-light text-dark-blue',
        pink: disabled ? 'bg-pink/50 text-light/50' : 'bg-pink text-light',
        green: disabled ? 'bg-green/50 text-dark-blue/50' : 'bg-green text-dark-blue',
        blue: disabled ? 'bg-light-blue/50 text-dark-blue/50' : 'bg-light-blue text-dark-blue'
    }

    const baseClasses = `
        flex items-center justify-center px-2.5 py-1.5 text-sm gap-1 rounded-lg
        transition-transform ${!disabled && !isLoading ? 'active:scale-[.98]' : ''}
        ${variantClasses[variant]}
        ${className}
    `

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || isLoading}
            className={baseClasses}
        >
            {isLoading ? (
                <Loader2 size={iconSize} className="animate-spin" />
            ) : (
                Icon && <Icon size={iconSize} />
            )}
            {children && <span>{children}</span>}
        </button>
    )
}