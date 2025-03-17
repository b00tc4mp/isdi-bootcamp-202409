export default function SingleSlider({ value, min, max, onChange, disabled }) {
    return (
        <div className="relative py-5 mt-2">
            {/* Background track */}
            <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-1 bg-light rounded-full"></div>

            {/* Colored portion of track */}
            <div
                className="absolute top-1/2 -translate-y-1/2 h-1 bg-light-blue rounded-full"
                style={{
                    left: '0%',
                    right: `${100 - ((value - min) / (max - min)) * 100}%`
                }}
            ></div>

            {/* Thumb */}
            <div
                className="absolute top-1/2 -translate-y-1/2 -ml-3 w-6 h-6 bg-pink border-2 border-dark-blue rounded-full shadow-md"
                style={{ left: `${((value - min) / (max - min)) * 100}%` }}
                onPointerDown={event => {
                    if (disabled) return

                    const startPos = event.clientX
                    const startValue = value
                    const range = max - min
                    const width = event.currentTarget.parentElement.offsetWidth

                    const onMove = moveEvent => {
                        const dx = moveEvent.clientX - startPos
                        const dValue = Math.round((dx / width) * range)
                        const newValue = Math.max(min, Math.min(max, startValue + dValue))
                        onChange(newValue)
                    }

                    const onUp = () => {
                        document.removeEventListener('pointermove', onMove)
                        document.removeEventListener('pointerup', onUp)
                    }

                    document.addEventListener('pointermove', onMove)
                    document.addEventListener('pointerup', onUp)
                }}
            />
        </div>
    )
}