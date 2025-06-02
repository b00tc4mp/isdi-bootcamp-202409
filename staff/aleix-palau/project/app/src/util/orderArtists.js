export default (artists = []) => {
    if (!artists || !artists.length) return []

    // Create a new array to avoid mutating the original
    const sortedArtists = [...artists]

    return sortedArtists.sort((a, b) => {
        // Handle both string arrays and object arrays
        const nameA = typeof a === 'string' ? a : a.name
        const nameB = typeof b === 'string' ? b : b.name

        return nameA.localeCompare(nameB)
    })
}