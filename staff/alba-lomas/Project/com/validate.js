


import errors from "./errors.js";

const { ValidationError } = errors

const validateRole = role => {
    if (typeof role !== 'string') throw new ValidationError('Rol inválido')
    if (!/^(restaurant|employee)$/i.test(role))
        throw new ValidationError('Rol inválido');
}

const validateName = name => {
    if (typeof name !== 'string') throw new ValidationError('Nombre inválido')
    if (name.length < 2)
        throw new ValidationError('Nombre demasiado corto')
}

const validateEmail = email => {
    if (typeof email !== 'string') throw new ValidationError('Email inválido')
    if (!/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email))
        throw new ValidationError('Formato de email inválido')
}

const validateLicense = license => {
    if (!license) throw new ValidationError('Licencia inválida')
    if (typeof license !== 'string') throw new ValidationError('Licencia inválida')
    if (!/^[0-9]{8}-[A-Z]$/i.test(license) && !/^[A-Z]-[0-9]{8}$/i.test(license))
        throw new ValidationError('Formato de documento de identidad inválido')
}

const validateDate = date => {
    if (!(date instanceof Date)) {
        throw new ValidationError('Fecha inválida')
    }
}

const validateIsoDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString() === dateString;
}

const validatePassword = password => {
    if (typeof password !== 'string') throw new ValidationError('Contraseña inválida')
    if (password.length < 8)
        throw new ValidationError('La contraseña debe tener al menos 8 caracteres')
}

const validatePasswordsMatch = (password, confirmPassword) => {
    if (typeof confirmPassword !== 'string') throw new ValidationError('Confirmación de contraseña inválida')
    if (password !== confirmPassword)
        throw new ValidationError('Las contraseñas no coinciden')
}

const validateImage = image => {
    if (typeof image !== 'string') throw new ValidationError('Imagen inválida')
}

const validateText = text => {
    if (typeof text !== 'string') throw new ValidationError('Texto inválido')
}

const validateId = (id, explain = 'id') => {
    if (typeof id !== 'string') throw new ValidationError(`ID inválido: ${explain}`)
    if (id.length !== 24) throw new ValidationError(`La longitud de la ${explain} es incorrecta`)
}

const validateNumber = (value) => {
    if (typeof value !== "number") {
        throw new Error("El valor debe ser un número");
    }
    if (isNaN(value) || typeof value !== 'number') {
        throw new ValidationError(`El ${explain} debe ser un número válido`)
    }
}

const validateCallback = callback => {
    if (typeof callback !== 'function') throw new ValidationError('El callback no es una función')
}

const validateExpense = (amount, type, provider) => {
    if (!amount || !type || !provider) throw new ValidationError('Todos los campos son obligatorios')
    if (isNaN(amount) || parseFloat(amount) <= 0) throw new ValidationError('La cantidad debe ser un número positivo')
}

const validate = {
    role: validateRole,
    name: validateName,
    email: validateEmail,
    license: validateLicense,
    date: validateDate,
    isoDate: validateIsoDate,
    password: validatePassword,
    passwordsMatch: validatePasswordsMatch,
    image: validateImage,
    text: validateText,
    id: validateId,
    number: validateNumber,
    callback: validateCallback,
    expense: validateExpense
}

export default validate