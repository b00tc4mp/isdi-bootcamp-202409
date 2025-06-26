import getDistance from './getDistance.js'

export default (userCoords, otherUserCoords) => {
    const distance = getDistance(userCoords, otherUserCoords)

    if (distance === null) {
        return 'Distance unknown'
    }

    if (distance < 1) {
        return 'Less than 1 km away'
    }

    return `${distance} km from you`
}