export default (coords1, coords2) => {
    // Handle missing or invalid coordinates
    if (!coords1 || !coords2 ||
        !coords1.coordinates || !coords2.coordinates ||
        coords1.coordinates.length !== 2 || coords2.coordinates.length !== 2) {
        return null
    }

    // Extract longitude and latitude from GeoJSON format
    const [lon1, lat1] = coords1.coordinates
    const [lon2, lat2] = coords2.coordinates

    // Earth's radius in kilometers
    const R = 6371

    // Convert degrees to radians
    const radLat1 = (lat1 * Math.PI) / 180
    const radLat2 = (lat2 * Math.PI) / 180
    const radDeltaLat = ((lat2 - lat1) * Math.PI) / 180
    const radDeltaLon = ((lon2 - lon1) * Math.PI) / 180

    // Haversine formula
    const a =
        Math.sin(radDeltaLat / 2) * Math.sin(radDeltaLat / 2) +
        Math.cos(radLat1) * Math.cos(radLat2) *
        Math.sin(radDeltaLon / 2) * Math.sin(radDeltaLon / 2)

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    // Calculate distance
    const distance = R * c

    // Round to 1 decimal place for display
    return Math.round(distance * 10) / 10
}