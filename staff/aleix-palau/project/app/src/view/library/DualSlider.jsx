export default function DualSlider({ minValue, maxValue, min, max, onMinChange, onMaxChange, disabled }) {
    const minPercentage = ((minValue - min) / (max - min)) * 100
    const maxPercentage = ((maxValue - min) / (max - min)) * 100

    // Convert clientX to value
    const clientXToValue = (clientX, rect) => {
        const percentage = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
        return Math.round(min + percentage * (max - min))
    }

    const handleSliderInteraction = event => {
        if (disabled) return

        const slider = event.currentTarget
        const rect = slider.getBoundingClientRect()
        const clickedValue = clientXToValue(event.clientX, rect)

        // Determine which thumb is closer
        const isMovingMin = Math.abs(clickedValue - minValue) < Math.abs(clickedValue - maxValue)

        const updateValue = clientX => {
            const newValue = clientXToValue(clientX, rect)

            if (isMovingMin) {
                const constrainedValue = Math.min(newValue, maxValue - 1)
                if (constrainedValue !== minValue && constrainedValue >= min)
                    onMinChange(constrainedValue)
            } else {
                const constrainedValue = Math.max(newValue, minValue + 1)
                if (constrainedValue !== maxValue && constrainedValue <= max)
                    onMaxChange(constrainedValue)
            }
        }

        // Initial update
        updateValue(event.clientX)

        // Set up drag handling
        const handleMove = e => updateValue(e.clientX)

        const handleEnd = () => {
            slider.releasePointerCapture(event.pointerId)
            slider.removeEventListener('pointermove', handleMove)
            slider.removeEventListener('pointerup', handleEnd)
        }

        slider.setPointerCapture(event.pointerId)
        slider.addEventListener('pointermove', handleMove)
        slider.addEventListener('pointerup', handleEnd)
    }

    return (
        <div
            className="relative py-5 mt-2 touch-none select-none"
            onPointerDown={handleSliderInteraction}
        >
            {/* Background track */}
            <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-1 bg-light rounded-full pointer-events-none" />

            {/* Colored portion */}
            <div
                className="absolute top-1/2 -translate-y-1/2 h-1 bg-light-blue rounded-full pointer-events-none"
                style={{
                    left: `${minPercentage}%`,
                    width: `${maxPercentage - minPercentage}%`
                }}
            />

            {/* Min thumb */}
            <div
                className="absolute top-1/2 -translate-y-1/2 -ml-3 w-6 h-6 bg-pink border-2 border-dark-blue rounded-full shadow-md pointer-events-none"
                style={{ left: `${minPercentage}%` }}
            />

            {/* Max thumb */}
            <div
                className="absolute top-1/2 -translate-y-1/2 -ml-3 w-6 h-6 bg-pink border-2 border-dark-blue rounded-full shadow-md pointer-events-none"
                style={{ left: `${maxPercentage}%` }}
            />
        </div>
    )
}