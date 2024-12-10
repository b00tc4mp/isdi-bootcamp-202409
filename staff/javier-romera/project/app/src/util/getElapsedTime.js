export default (ms) => {
    // const totalSeconds = ms / 1000

    // const hours = Math.floor(totalSeconds / 3600)
    // const minutes = Math.floor(totalSeconds / 60).toString().slice(0, 2)
    // const seconds = (totalSeconds % 60).toString().slice(0, 2)

    // if (hours > 0) return `${hours}:${minutes}:${seconds}`
    // else if (minutes > 0) return `${minutes}:${seconds}`
    // else return `${seconds}s`

    let totalSeconds = Math.floor(ms / 1000)

    const hours = Math.floor(totalSeconds / 3600)
    totalSeconds %= 3600
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60

    if (hours > 0) {
        return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    } else if (minutes > 0) {
        return `${minutes}:${String(seconds).padStart(2, '0')}m`
    } else {
        return `${seconds}s`
    }
}