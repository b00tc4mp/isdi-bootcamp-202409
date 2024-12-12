import errors from './errors.js'

const { ValidationError } = errors 

const validateName = name => {
    if (typeof name !== 'string') throw new ValidationError('invalid name')
    if (name.length < 2)
        throw new ValidationError('invalid name length')
}

const validateEmail = email => {
    if (typeof email !== 'string') throw new ValidationError('invalid e-mail')
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

const validateId = (id, explain = 'id') => {
    if (typeof id !== 'string') throw new ValidationError(`invalid ${explain}`)
    if (id.length !== 24) throw new ValidationError(`invalid ${explain} length`)
}

const validateCallback = callback => {
    if (typeof callback !== 'function') throw new ValidationError('invalid callback')
}

const validateAddress = address => {
    if (typeof address !== 'string') throw new ValidationError('invalid address');
    if (address.trim() === '') throw new ValidationError('address cannot be empty');
    if (address.length < 5) throw new ValidationError('address is too short');
    if (address.length > 200) throw new ValidationError('address is too long');
}

const validatePostcode = postcode => {
    if (typeof postcode !== 'string') throw new ValidationError('invalid postcode');
    if (!/^\d{5}$/.test(postcode)) throw new ValidationError('postcode must be a 5-digit number');
}

const validateCountry = country => {
    if (typeof country !== 'string') throw new ValidationError('invalid country');
    if (country.trim() === '') throw new ValidationError('country cannot be empty');
    if (country.length < 3) throw new ValidationError('country name is too short');
    if (country.length > 100) throw new ValidationError('country name is too long');
}

const validateCity = city => {
    if (typeof city !== 'string') throw new ValidationError('invalid city');
    if (city.trim() === '') throw new ValidationError('city cannot be empty');
    if (city.length < 2) throw new ValidationError('city name is too short');
    if (city.length > 100) throw new ValidationError('city name is too long');
}

const validateTelephone = telephone => {
    if (typeof telephone !== 'string') throw new ValidationError('invalid telephone number');
    if (!/^\+?\d{9,15}$/.test(telephone)) throw new ValidationError('telephone must be between 9 and 15 digits, with optional "+"');
}

const validateDate = (date) => {
    // Regular expression to match date format: dd/mm/yyyy
    const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

    if (!regex.test(date)) {
        throw new Error('Invalid date format. Expected format: dd/mm/yyyy');
    }
}

const validateDepth = (depth) => {
    // Regex pattern to match depth in formats like "18m", "12mt", "10ft", etc.
    const depthPattern = /^\d+(m|mt|ft)$/;

    // Check if the depth matches the pattern
    if (!depthPattern.test(depth)) {
        throw new Error('Invalid depth format. Expected format: number followed by "m", "mt", or "ft"');
    }
}

const validateTime = (time) => {
    // Regex pattern to match time in format like "45min", "10min"
    const timePattern = /^\d+min$/;

    // Check if the time matches the pattern
    if (!timePattern.test(time)) {
        throw new Error('Invalid time format. Expected format: "Xmin" (e.g., "45min", "10min")');
    }
}

const validateWeather = (weather) => {
    // Ensure weather is a string
    if (typeof weather !== 'string') {
        throw new Error('Weather must be a string');
    }

    // Ensure weather is not empty
    if (weather.trim().length === 0) {
        throw new Error('Weather cannot be empty');
    }

    // Optionally, ensure a reasonable length for the weather description (3 to 50 characters)
    if (weather.length < 3 || weather.length > 50) {
        throw new Error('Weather description must be between 3 and 50 characters');
    }
}

const validateTemperature = (temperature) => {
    // Ensure temperature is a number
    if (typeof temperature !== 'number') {
        throw new Error('Temperature must be a number');
    }

    // Optionally, ensure temperature is within a reasonable range
    // For example, between -100 and 100 degrees (Celsius or Fahrenheit)
    if (temperature < -10 || temperature > 50) {
        throw new Error('Temperature must be between -10 and 50');
    }
}

const validateVisibility = (visibility) => {
    // Ensure visibility is a string
    if (typeof visibility !== 'string') {
        throw new Error('Visibility must be a string');
    }
}

const validateWaves = (waves) => {
    // Ensure waves is a string
    if (typeof waves !== 'string') {
        throw new Error('Waves must be a string');
    }
}

const validateWetSuit = (wetSuit) => {
    // Ensure wetSuit is a string
    if (typeof wetSuit !== 'string') {
        throw new Error('WetSuit must be a string');
    }

    // Regular expression to match 'none', '3mm', '5mm', or '7mm'
    const validWetSuits = ['none', '3mm', '5mm', '7mm'];
    
    if (!validWetSuits.includes(wetSuit)) {
        throw new Error('WetSuit must be one of the following: none, 3mm, 5mm, 7mm');
    }
}

const validateWeight = (weight) => {
    // Ensure weight is a string
    if (typeof weight !== 'string') {
        throw new Error('Weight must be a string');
    }

    // Regular expression to match numbers followed by "kg" (e.g., "5kg", "10kg")
    const weightRegex = /^[0-9]+kg$/;

    if (!weightRegex.test(weight)) {
        throw new Error('Weight must be a valid number followed by "kg" (e.g., "5kg", "10kg")');
    }
}

const validateTankSize = (tankSize) => {
    // Ensure tankSize is a string
    if (typeof tankSize !== 'string') {
        throw new Error('Tank size must be a string');
    }

    // Regular expression to match a number followed by "L" (e.g., "12L", "15L")
    const tankSizeRegex = /^[0-9]+L$/;

    if (!tankSizeRegex.test(tankSize)) {
        throw new Error('Tank size must be a valid number followed by "L" (e.g., "12L", "15L")');
    }
}

const validateTankBar = (tankBar) => {
    // Ensure tankBar is a string
    if (typeof tankBar !== 'string') {
        throw new Error('Tank bar must be a string');
    }
}

const validateFeeling = (feeling) => {
    // Ensure feeling is a string
    if (typeof feeling !== 'string') {
        throw new Error('Feeling must be a string');
    }

    // Ensure feeling is not longer than 30 characters
    if (feeling.length > 30) {
        throw new Error('Feeling must be no longer than 30 characters');
    }
}

const validateDiveCenter = (diveCenter) => {
    // Ensure diveCenter is a string
    if (typeof diveCenter !== 'string') {
        throw new Error('Dive center must be a string');
    }

    // Ensure diveCenter is not longer than 30 characters
    if (diveCenter.length > 30) {
        throw new Error('Dive center must be no longer than 30 characters');
    }
}

const validateDiveSite = (diveSite) => {
    // Ensure diveSite is a string
    if (typeof diveSite !== 'string') {
        throw new Error('Dive site must be a string');
    }

    // Ensure diveSite is not longer than 30 characters
    if (diveSite.length > 30) {
        throw new Error('Dive site must be no longer than 30 characters');
    }
}

const validateNotes = (notes) => {
    // Ensure notes is a string
    if (typeof notes !== 'string') {
        throw new Error('Notes must be a string');
    }

    // Ensure notes is not longer than 300 characters
    if (notes.length > 300) {
        throw new Error('Notes must be no longer than 300 characters');
    }
}


const validate = {
    name: validateName,
    email: validateEmail,
    password: validatePassword,
    passwordsMatch: validatePasswordsMatch,
    address: validateAddress,
    postcode: validatePostcode,
    country: validateCountry,
    city: validateCity,
    telephone: validateTelephone,
    id: validateId,
    callback: validateCallback,
    date: validateDate,
    depth: validateDepth,
    time: validateTime,
    weather: validateWeather,
    temperature: validateTemperature,
    visibility: validateVisibility,
    waves: validateWaves,
    wetSuit: validateWetSuit,
    weight: validateWeight,
    tankSize: validateTankSize,
    tankBar: validateTankBar,
    feeling: validateFeeling,
    diveCenter: validateDiveCenter,
    diveSite: validateDiveSite,
    notes: validateNotes
}

export default validate