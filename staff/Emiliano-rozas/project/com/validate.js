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

const validateTitle = title => {
    if (typeof title !== 'string') throw new ValidationError('invalid title')
    if (title.length < 3) throw new ValidationError('title too short')
}

const validateAuthor = author => {
    if (typeof author !== 'string') throw new ValidationError('invalid author')
    if (author.length < 3) throw new ValidationError('author too short')
}

const validatePublisher = publisher => {
    if (typeof publisher !== 'string') throw new ValidationError('invalid publisher')
    if (publisher.length < 3) throw new ValidationError('publisher too short')
}

const validateIsbn = isbn => {
    if (typeof isbn !== 'string') throw new ValidationError('invalid ISBN')
    if (!/^\d{9}(\d|X)$/.test(isbn)) throw new ValidationError('invalid ISBN format')
}

const validatePrice = price => {
    if (typeof price !== 'number') throw new ValidationError('invalid price')
    if (price <= 0) throw new ValidationError('price must be above 0')
}

const validateDescription = description => {
    if (typeof description !== 'string') throw new ValidationError('invalid description')
    if (description.length < 3) throw new ValidationError('description too short')
}

const validateCategory = category => {
    if (typeof category !== 'string') throw new ValidationError('invalid category')
    if (category.length < 3) throw new ValidationError('category too short')
}

const validateStatus = status => {
    const validStatus = {
        product: ['published', 'draft', 'deactivated'],
        order: ['pending', 'confirmed', 'refund', 'cancel']
    } //TODO VALIDET INCLUDES
    if (typeof status !== 'string') {
        throw new ValidationError('invalid status');
    }
}

const validateStock = stock => {
    if (typeof stock !== 'number') throw new ValidationError('invalid stock')
    if (stock <= 0) throw new ValidationError('stock must be above 0')
}

const validateImage = image => {
    if (typeof image !== 'string') throw new ValidationError('invalid image')
    if (image.trim().length === 0) throw new ValidationError('invalid image length')
}

const validateImages = images => {
    if (!Array.isArray(images)) throw new ValidationError('invalid images, must be an array')
    images.forEach((image, index) => {
        if (typeof image !== 'string' || image.trim().length === 0) {
            throw new ValidationError(`invalid image at index ${index}`)
        }
    })
}

const validateBestSeller = bestSeller => {
    if (typeof bestSeller !== 'boolean') throw new ValidationError('invalid bestSeller value')
}

const validateText = text => {
    if (typeof text !== 'string') throw new ValidationError('invalid text')
    if (text.trim().length === 0) throw new ValidationError('invalid text length')
}

const validateId = (id, explain = 'id') => {
    if (typeof id !== 'string') throw new ValidationError(`invalid ${explain}`)
    // if (id.length !== 24) throw new ValidationError(`invalid ${explain} length`)
}

const validateCallback = callback => {
    if (typeof callback !== 'function') throw new ValidationError('invalid callback')
}

const validateNumber = (number, explain = 'number') => {
    if (typeof number !== 'number' || isNaN(number)) throw new ValidationError(`invalid ${explain}`)
}

const validatePhone = phone => {
    if (typeof phone !== 'string') throw new ValidationError('invalid phone')
    if (!/^\+?[1-9]\d{1,14}$/.test(phone)) {
        throw new ValidationError('invalid phone format')
    }
}

const validatePostalCode = postalCode => {
    if (typeof postalCode !== 'string') throw new ValidationError('invalid postal code')

    if (!/^[A-Za-z0-9\s]{4,10}$/.test(postalCode)) {
        throw new ValidationError('invalid postal code format')
    }
}
const validateStreet = street => {
    if (typeof street !== 'string') {
        throw new ValidationError('invalid street');
    }
    if (street.trim().length < 3 || street.trim().length > 50) {
        throw new ValidationError('invalid street length');
    }
    if (!/^[a-zA-Z0-9\s,.\-]+$/.test(street)) {
        throw new ValidationError('invalid street format');
    }
}

const validate = {
    name: validateName,
    email: validateEmail,
    username: validateUsername,
    password: validatePassword,
    passwordsMatch: validatePasswordsMatch,
    title: validateTitle,
    author: validateAuthor,
    publisher: validatePublisher,
    isbn: validateIsbn,
    price: validatePrice,
    description: validateDescription,
    category: validateCategory,
    status: validateStatus,
    stock: validateStock,
    image: validateImage,
    images: validateImages,
    bestSeller: validateBestSeller,
    text: validateText,
    id: validateId,
    callback: validateCallback,
    number: validateNumber,
    phone: validatePhone,
    postalCode: validatePostalCode,
    street: validateStreet
}

export default validate