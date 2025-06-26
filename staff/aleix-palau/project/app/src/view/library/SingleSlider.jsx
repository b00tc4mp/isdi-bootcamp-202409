export default function SingleSlider({ value, min, max, onChange, disabled }) {
    const percentage = ((value - min) / (max - min)) * 100

    const handleSliderInteraction = event => {
        if (disabled) return

        const slider = event.currentTarget
        const rect = slider.getBoundingClientRect()

        const updateValue = clientX => {
            const newPercentage = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
            const newValue = Math.round(min + newPercentage * (max - min))
            if (newValue !== value) onChange(newValue)
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
                    left: '0%',
                    width: `${percentage}%`
                }}
            />

            {/* Thumb */}
            <div
                className="absolute top-1/2 -translate-y-1/2 -ml-3 w-6 h-6 bg-pink border-2 border-dark-blue rounded-full shadow-md pointer-events-none"
                style={{ left: `${percentage}%` }}
            />
        </div>
    )
}