export default coords => {
    if (!coords || coords.length !== 2) return "Not set"

    // Round to 2 decimal places for display (about 1.1km precision)
    const lat = Math.round(coords[0] * 100) / 100
    const lng = Math.round(coords[1] * 100) / 100

    return `${lat}°, ${lng}°`
}