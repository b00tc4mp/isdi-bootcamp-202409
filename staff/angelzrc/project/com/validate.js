import errors from './errors.js'

const { ValidationError } = errors

const validateName = name => {
    if (typeof name !== 'string') throw new ValidationError('invalid name')
    if (name.length < 2)
        throw new ValidationError('invalid name length')
}

const validateEmail = email => {
    if (typeof email !== 'string') throw new ValidationError('invalid email')
    if (!/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email))
        throw new ValidationError('invalid e-mail')
}

const validateUsername = username => {
    if (typeof username !== 'string') throw new ValidationError('invalid username')
    if (username.length < 3 || username.length > 30)
        throw new ValidationError('invalid username length')
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

const validateArrayOfStrings = (array) => {
    if (!Array.isArray(array)) throw new ValidationError('invalid input, not an array');

    array.forEach((item, index) => {
        if (typeof item !== 'string') throw new ValidationError(`invalid element at index ${index}: not a string`);
        if (item.length < 1) throw new ValidationError(`invalid length at index ${index}: must be at least 1 characters long`);
    });
};

const validateLocation = (coordinates) => {
    if (!Array.isArray(coordinates)) {
        throw new ValidationError('invalid input, not an array');
    }
    if (coordinates.length !== 2) {
        throw new ValidationError('coordinates array must contain exactly two elements');
    }

    const [longitude, latitude] = coordinates;

    if (typeof longitude !== 'number' || typeof latitude !== 'number') {
        throw new ValidationError('both elements must be numbers');
    }
    if (longitude < -180 || longitude > 180) {
        throw new ValidationError('longitude must be within the range of -180 to 180');
    }
    if (latitude < -90 || latitude > 90) {
        throw new ValidationError('latitude must be within the range of -90 to 90');
    }
};

const validateDate = (date) => {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
        throw new ValidationError('invalid input, not a valid date');
    }

    const now = new Date();
    if (date < now) {
        throw new ValidationError('date cannot be in the past');
    }


};

const validateString = (date) => {
    if (typeof date !== 'string') throw new ValidationError('invalid input, not a string');
    if (date.trim().length === 0) throw new ValidationError('invalid input, string cannot be empty');
}

const validate = {
    name: validateName,
    email: validateEmail,
    username: validateUsername,
    password: validatePassword,
    passwordsMatch: validatePasswordsMatch,
    image: validateImage,
    text: validateText,
    id: validateId,
    callback: validateCallback,
    arrayOfStrings: validateArrayOfStrings,
    location: validateLocation,
    date: validateDate,
    string: validateString,

}

export default validate