import errors from './errors.js'

const { ValidationError } = errors

const validateName = name => {
    if (typeof name !== 'string') throw new ValidationError('El campo de nombre no está completo')
    if (name.length < 2)
        throw new ValidationError('Nombre es muy corto minimo 2 caracteres')
}
const validateEmail = email => {
    if (typeof email !== 'string') throw new ValidationError('El campo de email no está completo')
    if (!/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email))
        throw new ValidationError('invalid e-mail')
}
const validateUsername = username => {
    if (typeof username !== 'string') throw new ValidationError('El campo de nombre de usuario no está completo')
    if (username.length < 4 || username.length > 12)
        throw new ValidationError('El nombre de usuario tiene que ser entre 4 y 12 caracteres')
}
const validatePassword = password => {
    if (typeof password !== 'string') throw new ValidationError('El campo de contraseña no está completo')
    if (password.length < 8)
        throw new ValidationError('El password solo puede contener 8 caracteres')
}
const validatePasswordsMatch = (password, passwordRepeat) => {
    if (typeof passwordRepeat !== 'string') throw new ValidationError('El campo de repetir contraseña no está completo')
    if (password !== passwordRepeat)
        throw new ValidationError('Las contraseñas no coinciden')
}
const validateImage = image => {
    if (typeof image !== 'string') throw new ValidationError('Campo de la imagen no está completo')
}
const validatePhone = phone => {
    if (typeof phone !== 'string') throw new ValidationError('Campo del número de teléfono no está completo')
    if (phone.length < 12 || phone.length > 15)
        throw new ValidationError('El número de teléfono tiene que tener entre 12 y 15 caracteres')
}
const validateText = text => {
    if (typeof text !== 'string') throw new ValidationError('Campo del texto no está completo')
    if (text.length < 1 || text.length > 500) throw new ValidationError('El texto tiene un mínimo de 1 caracteres y máximo de 500')
}
const validateId = (id, explain = 'id') => {
    if (typeof id !== 'string') throw new ValidationError(`invalid${explain}`)
    if (id.length !== 24) throw new ValidationError(`invalid${explain} length`)
}
const validateChip = chip => {
    if (typeof chip !== 'string') throw new ValidationError('El campo del chip no está completo')
    if (chip.length !== 15) throw new ValidationError('Tiene que tener 15 caracteres el chip del animal')
}
const validateRace = race => {
    if (typeof race !== 'string') throw new ValidationError('El campo de la raza del perro no está completo')
    if (race.length < 2 || race.length > 20)
        throw new ValidationError('Solo puede contener entre 2 y 20 caracteres')
}
const validateSex = sex => {
    if (typeof sex !== 'boolean') throw new ValidationError('Campo no rellenado del sexo del animal')
}
const validateWeight = weight => {
    if (typeof weight !== 'number') throw new ValidationError('Campo no rellenado de peso del animal')
    if (weight > 300) throw new ValidationError('Peso del animal incorrecto')
}
const validateSterilized = sterilized => {
    if (typeof sterilized !== 'boolean') throw new ValidationError('Campo no rellenado de la este esterilizacion del animal')
}
const validateDate = dateOfBirth => {
    if (typeof dateOfBirth !== 'string') throw new ValidationError('La fecha de nacimiento no está completa')
}
const validateType = type => {
    if (typeof type !== 'string') throw new ValidationError('Campo no rellenado tipo de informe')
}
const validateVaccineName = vaccineName => {
    if (typeof vaccineName !== 'string') throw new ValidationError('Campo del tipo de vacuna no esta completa')
}
const validateDeworn = deworn => {
    if (typeof deworn !== 'string') throw new ValidationError('Campo del tipo dedesparasitacion no esta completa ')
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
    phone: validatePhone,
    chip: validateChip,
    race: validateRace,
    sex: validateSex,
    weight: validateWeight,
    sterilized: validateSterilized,
    dateOfBirth: validateDate,
    type: validateType,
    vaccineName: validateVaccineName,
    deworn: validateDeworn

}

export default validate