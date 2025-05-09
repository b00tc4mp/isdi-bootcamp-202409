import { Meet } from 'dat'
import { validate, errors } from 'com'

const { SystemError } = errors

export default function createMeet(author, interests, trending, location, startTime, endTime, address, placeName) {
    validate.id(author)
    validate.arrayOfStrings(interests)
    if (trending) validate.arrayOfStrings(trending)
    validate.location(location)
    validate.date(startTime)
    validate.date(endTime)
    if (placeName) validate.string(placeName)
    if (address) validate.string(address)

    return (async () => {
        try {
            const meet = new Meet({
                author,
                interests,
                trending,
                location,
                startTime,
                endTime,
                address,
                placeName,
            })

            await Meet.create(meet)
        } catch (error) {
            throw new SystemError(error.message)
        }
    })()
}