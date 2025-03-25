export default coords => {
    if (coords && coords.coordinates && coords.coordinates.length === 2) {
        // Round to 2 decimal places for display (about 1.1km precision)
        const lat = Math.round(coords.coordinates[1] * 100) / 100
        const lng = Math.round(coords.coordinates[0] * 100) / 100
        return `${lat}°, ${lng}°`
    }

    return "Not set"
}