export default (artists = []) => {
    if (!artists || !artists.length) return []

    // Create a new array to avoid mutating the original
    const sortedArtists = [...artists]

    return sortedArtists.sort((a, b) => a.localeCompare(b))
}