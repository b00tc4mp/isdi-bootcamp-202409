import errors from './errors.js'

const { ValidationError } = errors

const validateName = name => {
    if (typeof name !== 'string') throw new ValidationError('invalid name')
    if (name.trim().length < 2)
        throw new ValidationError('invalid name length')
}

const validateEmail = email => {
    if (typeof email !== 'string') throw new ValidationError('invalid email')
    if (!/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email))
        throw new ValidationError('invalid e-mail')
}

const validatePassword = password => {
    if (typeof password !== 'string') throw new ValidationError('invalid password')
    if (password.length < 8)
        throw new ValidationError('invalid password length')
}

const validatePasswordsMatch = (password, passwordRepeat) => {
    if (typeof passwordRepeat !== 'string') throw new ValidationError('invalid password repeat')
    if (password !== passwordRepeat)
        throw new ValidationError('passwords do not match')
}

const validateImage = image => {
    if (typeof image !== 'string') throw new ValidationError('invalid image')
    if (image.trim().length === 0) throw new ValidationError('invalid image length')
}

const validateText = text => {
    if (typeof text !== 'string') throw new ValidationError('invalid text')
    if (text.trim().length === 0) throw new ValidationError('invalid text length')
}

const validateId = (id, explain = 'id') => {
    if (typeof id !== 'string') throw new ValidationError(`invalid ${explain}`)
    if (id.length !== 24) throw new ValidationError(`invalid ${explain} length`)
}

const validateCallback = callback => {
    if (typeof callback !== 'function') throw new ValidationError('invalid callback')
}

const validateDateOfBirth = dateOfBirth => {
    if (!dateOfBirth || typeof dateOfBirth !== 'string') {
        throw new ValidationError('invalid date of birth')
    }

    const parsedDate = Date.parse(dateOfBirth)
    if (isNaN(parsedDate)) {
        throw new ValidationError('invalid date of birth')
    }

    // Ensures the input it's a valid calendar date
    const normalizedDate = new Date(parsedDate).toISOString().slice(0, 10)
    if (normalizedDate !== dateOfBirth) {
        throw new ValidationError('invalid date of birth')
    }

    // Age >= 18?
    const today = new Date()
    const birthDate = new Date(parsedDate)

    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--
    }

    if (age < 18) {
        throw new ValidationError('You must be at least 18 years old.')
    }
}

const validateStage = stage => {
    const validStages = ['name-dob', 'gender', 'genres', 'artists', 'photos', 'completed']
    if (!validStages.includes(stage)) {
        console.log(`ValidationError thrownnn: invalid stage: ${stage}`) // Debug log
        throw new ValidationError(`invalid stage: ${stage}`)
    }
}

const validateGender = gender => {
    const validGenders = ['Man', 'Woman', 'Nonbinary']
    if (!validGenders.includes(gender)) {
        throw new ValidationError(`invalid gender: ${gender}`)
    }
}

const validateTargetGender = targetGender => {
    if (!Array.isArray(targetGender)) {
        throw new ValidationError('invalid target gender: must be an array')
    }
    const validTargetGenders = ['Men', 'Women', 'Nonbinary people']
    targetGender.forEach((gender) => {
        if (!validTargetGenders.includes(gender)) {
            throw new ValidationError(`invalid target gender: ${gender}`)
        }
    })
}

const validate = {
    name: validateName,
    email: validateEmail,
    password: validatePassword,
    passwordsMatch: validatePasswordsMatch,
    image: validateImage,
    text: validateText,
    id: validateId,
    callback: validateCallback,
    dateOfBirth: validateDateOfBirth,
    stage: validateStage,
    gender: validateGender,
    targetGender: validateTargetGender
}

export default validate