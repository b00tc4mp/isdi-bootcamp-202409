import errors from './errors.js'
import { calculateAge } from '../app/src/util/index.js'

const { ValidationError } = errors

const validateName = name => {
    if (typeof name !== 'string') throw new ValidationError('invalid name')
    if (name.trim().length < 2) throw new ValidationError('invalid name length')
}

const validateEmail = email => {
    if (typeof email !== 'string') throw new ValidationError('invalid email')
    if (!/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email))
        throw new ValidationError('invalid e-mail')
}

const validatePassword = password => {
    if (typeof password !== 'string') throw new ValidationError('invalid password')
    if (password.length < 8) throw new ValidationError('invalid password length')
}

const validatePasswordsMatch = (password, passwordRepeat) => {
    if (typeof passwordRepeat !== 'string') throw new ValidationError('invalid password repeat')
    if (password !== passwordRepeat) throw new ValidationError('passwords do not match')
}

const validateText = (text, explain = 'text', maxLength = 500) => {
    if (typeof text !== 'string') throw new ValidationError(`invalid ${explain}`)
    if (text.trim().length === 0) throw new ValidationError(`${explain} cannot be empty`)
    if (text.length > maxLength) throw new ValidationError(`${explain} cannot exceed ${maxLength} characters`)
}

const validateId = (id, explain = 'id') => {
    if (typeof id !== 'string') throw new ValidationError(`invalid ${explain}`)
    if (id.length !== 24) throw new ValidationError(`invalid ${explain} length`)
}

// const validateCallback = callback => { // TODO
//     if (typeof callback !== 'function') throw new ValidationError('invalid callback')
// }

const validateDateOfBirth = dateOfBirth => {
    if (!dateOfBirth || typeof dateOfBirth !== 'string') throw new ValidationError('invalid date of birth')

    const parsedDate = Date.parse(dateOfBirth)
    if (isNaN(parsedDate)) throw new ValidationError('invalid date of birth')

    // Ensures the input it's a valid calendar date
    const normalizedDate = new Date(parsedDate).toISOString().slice(0, 10)
    if (normalizedDate !== dateOfBirth) throw new ValidationError('invalid date of birth')

    const age = calculateAge(dateOfBirth)
    if (age < 18) throw new ValidationError('You must be at least 18 years old.')
    if (age > 100) throw new ValidationError('Please enter a valid date of birth.')
}

const validateStage = stage => {
    const validStages = ['name-dob', 'gender', 'artists', 'completed']
    if (!validStages.includes(stage)) throw new ValidationError(`invalid stage: ${stage}`)
}

const validateGender = gender => {
    const validGenders = ['Man', 'Woman', 'Nonbinary']
    if (!validGenders.includes(gender)) throw new ValidationError(`invalid gender: ${gender}`)
}

const validateTargetGender = targetGender => {
    if (!Array.isArray(targetGender)) throw new ValidationError('invalid target gender: must be an array')

    const validTargetGenders = ['Men', 'Women', 'Nonbinary people']
    targetGender.forEach(gender => {
        if (!validTargetGenders.includes(gender)) throw new ValidationError(`invalid target gender: ${gender}`)
    })
}

const validateArtists = artists => {
    if (!Array.isArray(artists)) throw new ValidationError('invalid artists: must be an array')
    artists.forEach(artist => {
        if (typeof artist !== 'object' || artist === null) throw new ValidationError('invalid artist entry: must be an object')
        if (typeof artist.id !== 'string' || artist.id.trim().length === 0) throw new ValidationError('invalid artist id: must be a non-empty string')
        if (typeof artist.name !== 'string' || artist.name.trim().length === 0) throw new ValidationError('invalid artist name: must be a non-empty string')
    })
}

const MAX_PIC_SIZE_MB = 4

const validatePictures = pictures => {
    if (!Array.isArray(pictures)) throw new ValidationError('pictures is not an array')
    if (pictures.length > 3) throw new ValidationError('maximum of 3 pictures allowed')

    pictures.forEach(picture => {
        if (typeof picture !== 'string') throw new ValidationError('invalid picture')

        // Check if the picture is base64-encoded with a valid prefix.
        if (!picture.startsWith('data:image/')) throw new ValidationError('picture must be a base64-encoded image')

        // Validate MIME type: allow png, jpeg, jpg, and webp.
        const mimeTypeMatch = picture.match(/^data:image\/(png|jpeg|jpg|webp);base64,/)
        if (!mimeTypeMatch) throw new ValidationError('invalid picture format: must be PNG, JPEG, or WEBP')

        // Extract and validate base64 data.
        const base64Data = picture.split(';base64,')[1]
        if (!base64Data) throw new ValidationError('invalid picture: missing base64 data')

        // Calculate size: base64 string length * 0.75 gives us the actual byte size
        // (since base64 encoding increases size by roughly 33%)
        const sizeInBytes = Math.ceil((base64Data.length * 3) / 4)
        const sizeInMB = sizeInBytes / (1024 * 1024)

        if (sizeInMB > MAX_PIC_SIZE_MB) throw new ValidationError(`picture exceeds maximum size of ${MAX_PIC_SIZE_MB} MB`)
    })
}

const validateProfilePicture = (profilePicture, pictures) => {
    if (profilePicture === null) return
    if (typeof profilePicture !== 'string') throw new ValidationError('invalid profile picture')
    if (pictures && !pictures.includes(profilePicture)) throw new ValidationError('profile picture must be one of the uploaded pictures')
}

const validateBio = bio => {
    if (bio === null) return
    if (typeof bio !== 'string') throw new ValidationError('invalid bio')
    if (bio.trim().length > 200) throw new ValidationError('bio must not exceed 200 characters')
}

const validateLocation = location => {
    if (location === null) return
    if (typeof location !== 'string') throw new ValidationError('invalid location')
}

const validateMinAge = (minAge, maxAge) => {
    if (typeof minAge !== 'number') throw new ValidationError('invalid minimum age')
    if (minAge < 18) throw new ValidationError('minimum age must be at least 18')
    if (minAge > 55) throw new ValidationError('minimum age cannot exceed 55')
    if (maxAge && minAge > minAge) throw new ValidationError('minimum age cannot be more than maximum age')
}

const validateMaxAge = (maxAge, minAge) => {
    if (typeof maxAge !== 'number') throw new ValidationError('invalid maximum age')
    if (maxAge < 18) throw new ValidationError('maximum age must be at least 18')
    if (maxAge > 55) throw new ValidationError('maximum age cannot exceed 55')
    if (minAge && maxAge < minAge) throw new ValidationError('maximum age cannot be less than minimum age')
}

const validateDistance = distance => {
    if (!Number.isInteger(distance)) throw new ValidationError('distance must be a whole number')
    if (typeof distance !== 'number') throw new ValidationError('invalid distance')
    if (distance < 1) throw new ValidationError('distance must be at least 1')
    if (distance > 200) throw new ValidationError('distance cannot exceed 200')
}

const validateCoordinates = coordinates => {
    if (coordinates === null) return // null for new users who haven't set location yet

    // Check if it's a GeoJSON object
    if (coordinates.type && coordinates.coordinates) {
        if (coordinates.type !== 'Point') throw new ValidationError('coordinates type must be Point')
        if (!Array.isArray(coordinates.coordinates)) throw new ValidationError('coordinates must be an array')
        if (coordinates.coordinates.length !== 2) throw new ValidationError('coordinates must contain [longitude, latitude]')

        const [lng, lat] = coordinates.coordinates
        if (typeof lng !== 'number' || typeof lat !== 'number') throw new ValidationError('coordinates must be numbers')
        if (lng < -180 || lng > 180) throw new ValidationError('longitude must be between -180 and 180')
        if (lat < -90 || lat > 90) throw new ValidationError('latitude must be between -90 and 90')
        return
    }
    throw new ValidationError('invalid coordinates format')
}

const validateAction = action => {
    if (typeof action !== 'string') throw new ValidationError('invalid action')
    if (action !== 'left' && action !== 'right') throw new ValidationError('invalid action, must be "left" or "right"')
}

const validateSpotifyId = spotifyId => {
    if (typeof spotifyId !== 'string' || spotifyId.trim().length === 0) throw new ValidationError('invalid Spotify ID')
}

const validateSpotifyToken = token => {
    if (typeof token !== 'string' || token.trim().length === 0) throw new ValidationError('invalid Spotify token')
}

const validateCode = code => {
    if (typeof code !== 'string' || !code.trim().length) throw new ValidationError('Authorization code is required')
}

const validateQuery = query => {
    if (typeof query !== 'string' || !query.trim().length) throw new ValidationError('Search query is required')
}

const validate = {
    name: validateName,
    email: validateEmail,
    password: validatePassword,
    passwordsMatch: validatePasswordsMatch,
    text: validateText,
    id: validateId,
    // callback: validateCallback, // TODO
    dateOfBirth: validateDateOfBirth,
    stage: validateStage,
    gender: validateGender,
    targetGender: validateTargetGender,
    artists: validateArtists,
    pictures: validatePictures,
    profilePicture: validateProfilePicture,
    bio: validateBio,
    location: validateLocation,
    minAge: validateMinAge,
    maxAge: validateMaxAge,
    distance: validateDistance,
    coordinates: validateCoordinates,
    action: validateAction,
    spotifyId: validateSpotifyId,
    spotifyToken: validateSpotifyToken,
    code: validateCode,
    query: validateQuery
}

export default validate
// TODO: maybe delete spotifyId and simply use id