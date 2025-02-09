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

// const validateText = text => {
//     if (typeof text !== 'string') throw new ValidationError('invalid text')
//     if (text.trim().length === 0) throw new ValidationError('invalid text length')
// }

const validateId = (id, explain = 'id') => {
    if (typeof id !== 'string') throw new ValidationError(`invalid ${explain}`)
    if (id.length !== 24) throw new ValidationError(`invalid ${explain} length`)
}

// const validateCallback = callback => {
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
    if (!Array.isArray(targetGender)) {
        throw new ValidationError('invalid target gender: must be an array')
    }
    const validTargetGenders = ['Men', 'Women', 'Nonbinary people']
    targetGender.forEach(gender => {
        if (!validTargetGenders.includes(gender)) throw new ValidationError(`invalid target gender: ${gender}`)
    })
}

const validateArtists = artists => {
    if (!Array.isArray(artists)) throw new ValidationError('invalid artists: must be an array')
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

        // const sizeInBytes = atob(base64Data).length; // Converts base64 to binary string
        // const sizeInMB = sizeInBytes / (1024 * 1024) // Converts bytes to megabytes

        // Calculate file size using Buffer (works in Node).
        const sizeInBytes = Buffer.from(base64Data, 'base64').length
        const sizeInMB = sizeInBytes / (1024 * 1024)

        if (sizeInMB > MAX_PIC_SIZE_MB) throw new ValidationError(`picture exceeds maximum size of ${MAX_PIC_SIZE_MB} MB`)
    })
}

const validateProfilePicture = (profilePicture, pictures) => {
    if (profilePicture === null) return // Allow null for users without pictures

    if (typeof profilePicture !== 'string') throw new ValidationError('invalid profile picture')

    if (!pictures.includes(profilePicture)) throw new ValidationError('profile picture must be one of the uploaded pictures')
}

const validateBio = bio => {
    if (bio === undefined || bio === null) return // If bio is not provided, that's OK

    if (typeof bio !== 'string') throw new ValidationError('invalid bio')

    if (bio.trim().length > 200) throw new ValidationError('bio must not exceed 200 characters')
}

const validateLocation = location => {
    if (location === undefined || location === null) return // If location is not provided, that's OK

    if (typeof location !== 'string') throw new ValidationError('invalid location')
}

const validate = {
    name: validateName,
    email: validateEmail,
    password: validatePassword,
    passwordsMatch: validatePasswordsMatch,
    // TODO text: validateText, mirar si calen
    id: validateId,
    // callback: validateCallback,
    dateOfBirth: validateDateOfBirth,
    stage: validateStage,
    gender: validateGender,
    targetGender: validateTargetGender,
    artists: validateArtists,
    pictures: validatePictures,
    profilePicture: validateProfilePicture,
    bio: validateBio,
    location: validateLocation
}

export default validate