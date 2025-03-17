import { Loader2 } from 'lucide-react'

export default function PrimaryButton({
    type = 'button',
    children,
    onClick,
    disabled = false,
    className = '',
}) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`
                w-full
                max-h-[3rem]
                inline-flex
                items-center
                justify-center
                rounded-full
                py-3
                px-4
                text-darkest-blue
                font-semibold
                text-lg
                transition-transform
                active:scale-[.98]
                leading-snug
                outline-none
                bg-pink
                ${className}
                `}
        >
            {disabled ? (
                <div className="flex items-center justify-center">
                    <Loader2 className="w-7 h-7 animate-spin" />
                </div>
            ) : children}
        </button>
    )
}