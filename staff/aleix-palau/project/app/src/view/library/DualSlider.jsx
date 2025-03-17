export default function DualSlider({ minValue, maxValue, min, max, onMinChange, onMaxChange, disabled }) {
    return (
        <div className="relative py-5 mt-2">
            {/* Background track */}
            <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-1 bg-light rounded-full"></div>

            {/* Colored portion of track */}
            <div
                className="absolute top-1/2 -translate-y-1/2 h-1 bg-light-blue rounded-full"
                style={{
                    left: `${((minValue - min) / (max - min)) * 100}%`,
                    right: `${100 - ((maxValue - min) / (max - min)) * 100}%`
                }}
            ></div>

            {/* Left thumb */}
            <div
                className="absolute top-1/2 -translate-y-1/2 -ml-3 w-6 h-6 bg-pink border-2 border-dark-blue rounded-full shadow-md"
                style={{ left: `${((minValue - min) / (max - min)) * 100}%` }}
                onPointerDown={event => {
                    if (disabled) return

                    const startPos = event.clientX
                    const startValue = minValue
                    const range = max - min
                    const width = event.currentTarget.parentElement.offsetWidth

                    const onMove = moveEvent => {
                        const dx = moveEvent.clientX - startPos
                        const dValue = Math.round((dx / width) * range)
                        const newValue = Math.max(min, Math.min(maxValue - 1, startValue + dValue))
                        onMinChange(newValue)
                    }

                    const onUp = () => {
                        document.removeEventListener('pointermove', onMove)
                        document.removeEventListener('pointerup', onUp)
                    }

                    document.addEventListener('pointermove', onMove)
                    document.addEventListener('pointerup', onUp)
                }}
            />

            {/* Right thumb */}
            <div
                className="absolute top-1/2 -translate-y-1/2 -ml-3 w-6 h-6 bg-pink border-2 border-dark-blue rounded-full shadow-md"
                style={{ left: `${((maxValue - min) / (max - min)) * 100}%` }}
                onPointerDown={event => {
                    if (disabled) return

                    const startPos = event.clientX
                    const startValue = maxValue
                    const range = max - min
                    const width = event.currentTarget.parentElement.offsetWidth

                    const onMove = moveEvent => {
                        const dx = moveEvent.clientX - startPos
                        const dValue = Math.round((dx / width) * range)
                        const newValue = Math.min(max, Math.max(minValue + 1, startValue + dValue))
                        onMaxChange(newValue)
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