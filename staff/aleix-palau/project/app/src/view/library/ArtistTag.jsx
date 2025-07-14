export default function ArtistTag({
    children,
    onClick,
    isHighlighted = false,
    className = ''
}) {
    return (
        <span
            onClick={onClick}
            className={`
                inline-flex
                items-center
                justify-center
                rounded-full
                px-3.5
                py-1
                font-semibold
                text-sm
                text-dark-blue
                transition-transform
                ${isHighlighted ? 'bg-pink' : 'bg-skin'}
                ${onClick ? 'active:scale-[.98]' : ''}
                ${className}
            `}
        >
            {children}
        </span>
    )
}