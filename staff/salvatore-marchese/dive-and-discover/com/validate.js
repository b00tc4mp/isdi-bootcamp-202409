import errors from './errors.js'
import { Types } from 'mongoose'

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
    if (!Types.ObjectId.isValid(id)) throw new ValidationError(`Invalid ${explain}: not a valid MongoDB ObjectId`);
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
    /*     if (!/^\d{5}$/.test(postcode)) throw new ValidationError('postcode must be a 5-digit number'); */
}

const validateCountry = country => {
    if (typeof country !== 'string') throw new ValidationError('invalid country');
    if (country.trim() === '') throw new ValidationError('country cannot be empty');
    if (country.length < 3) throw new ValidationError('country name is too short');
    if (country.length > 100) throw new ValidationError('country name is too long');
}

const validateCity = city => {
    if (!city || typeof city !== 'string') {
        return res.status(400).json({ error: 'City is required and must be a string' });
    };
    if (city.trim() === '') throw new ValidationError('city cannot be empty');
    if (city.length < 2) throw new ValidationError('city name is too short');
    if (city.length > 100) throw new ValidationError('city name is too long');
}

/* const validateTelephone = telephone => {
    if (typeof telephone !== 'string') throw new ValidationError('invalid telephone number');
    if (!/^\+?\d{9,15}$/.test(telephone)) throw new ValidationError('telephone must be between 9 and 15 digits, with optional "+"');
} */

const validateTelephone = telephone => {
    if (typeof telephone !== 'string') throw new ValidationError('invalid telephone number');
    if (!/^\+?[\d\s\-]{9,15}$/.test(telephone)) throw new ValidationError('telephone must be between 9 and 15 digits, with optional "+" and spaces or dashes');
}


const validateDiveSite = (diveSite) => {
    // Ensure diveSite is a string
    if (typeof diveSite !== 'string') {
        throw new Error('Dive site must be a string');
    }

    // Trim whitespace and ensure diveSite is not empty
    diveSite = diveSite.trim();
    if (diveSite.length === 0) {
        throw new Error('Dive site cannot be empty');
    }

    // Ensure diveSite is not longer than 30 characters
    if (diveSite.length > 30) {
        throw new Error('Dive site must be no longer than 30 characters');
    }
}

const validateDate = date => {
    if (!(date instanceof Date)) {
        throw new ValidationError('invalid date')
    }
}

const validateDepth = (depth) => {
    // Convert the depth to a number (if it's a string, it will be parsed)
    const parsedDepth = Number(depth);

    // Check if the parsed depth is a valid number
    if (isNaN(parsedDepth)) {
        throw new Error('Invalid depth. Expected a number.');
    }

    // Check if the depth is a positive number
    if (parsedDepth <= 0) {
        throw new Error('Depth must be a positive number.');
    }
};

const validateTime = (time) => {
    // Ensure time is a number (not a string, object, etc.)
    if (typeof time !== 'number' || isNaN(time)) {
        throw new Error('Time must be a valid number.');
    }

    // Ensure time is not empty (already covered by the typeof check)
    if (time === null || time === undefined) {
        throw new Error('Time cannot be empty.');
    }

    // Ensure time is positive
    if (time <= 0) {
        throw new Error('Time must be a positive number.');
    }
};

const validateWeather = (weather) => {
    // Ensure weather is a string
    if (typeof weather !== 'string') {
        throw new Error('Weather must be a string');
    }

    // Trim whitespace before performing the length check
    const trimmedWeather = weather.trim();
};

const validateTemperature = (temperature) => {
    // Convert temperature to a number (if it's a string, it will be parsed)
    const parsedTemperature = Number(temperature);

    // Check if the parsed temperature is a valid number
    if (isNaN(parsedTemperature)) {
        throw new Error('Temperature must be a valid number');
    }

    // Check if the temperature is within the allowed range (0 to 50)
    if (parsedTemperature < 0 || parsedTemperature > 50) {
        throw new Error('Temperature must be between 0 and 50');
    }
};

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
    // Convert the input to a number (in case it's a string)
    wetSuit = Number(wetSuit);

    // Ensure wetSuit is a valid number (not NaN)
    if (isNaN(wetSuit)) {
        throw new Error('WetSuit must be a valid number');
    }

    // Check if the number is non-negative
    if (wetSuit < 0) {
        throw new Error('WetSuit must be a non-negative number');
    }
};

const validateWeight = (weight) => {
    // Convert the weight to a float (if it's a string, it'll be converted to a number)
    weight = parseFloat(weight);

    // Ensure weight is actually a number (not a string, object, etc.)
    if (isNaN(weight)) {
        throw new Error('Weight must be a valid number');
    }

    // Ensure the weight is a valid, positive number (greater than 0)
    if (weight <= 0) {
        throw new Error('Weight must be a positive number');
    }
};

const validateTankSize = (tankSize) => {
    // Parse the input as a float (if it's a string, it'll be converted to a number)
    tankSize = parseFloat(tankSize);

    // Ensure the result is a valid number
    if (isNaN(tankSize)) {
        throw new Error('Tank size must be a valid number');
    }
};

const validateTankBar = (tankBar) => {
    // Parse the input as a float (if it's a string, it'll be converted to a number)
    tankBar = parseFloat(tankBar);

    // Ensure the result is a valid number
    if (isNaN(tankBar)) {
        throw new Error('Tank bar must be a valid number');
    }
};

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

const validateProfile = (data) => {
    Object.keys(data).forEach(key => {
        if (validate[key]) {
            validate[key](data[key])
        }
    })
}

const validateText = {
    text: (value, fieldName) => {
        // Check if the value is null or undefined
        if (value === null || value === undefined) {
            throw new Error(`${fieldName} cannot be null or undefined`);
        }

        // Ensure the value is a string
        if (typeof value !== 'string') {
            throw new Error(`${fieldName} must be a string`);
        }

        // Trim leading and trailing spaces and ensure it's not an empty string
        const trimmedValue = value.trim();
        if (trimmedValue === '') {
            throw new Error(`${fieldName} cannot be an empty string`);
        }
    }
};

const validateUpdateData = (data) => {
    const validFields = {
        date: "Date",
        depth: "Number",
        diver: "String",
        time: "Number",
        temperature: "Number",
        wetSuit: "Number",
        weight: "Number",
        tankSize: "Number",
        tankBar: "Number",
        feeling: "String",
        weather: "String",
        visibility: "String",
        waves: "String",
        diveCenter: "String",
        diveSite: "String",
        notes: "String",
    };

    const errors = [];

    for (const key in data) {
        if (!(key in validFields)) {
            errors.push(`Invalid field: ${key}`);
            continue;
        }

        const expectedType = validFields[key];
        const value = data[key];

        switch (expectedType) {
            case "Date":
                if (isNaN(new Date(value).getTime())) {
                    errors.push(`Invalid value for ${key}: expected a valid Date.`);
                }
                break;

            case "Number":
                if (isNaN(Number(value))) {
                    errors.push(`Invalid value for ${key}: expected a Number.`);
                }
                break;

            case "String":
                if (typeof value !== "string") {
                    errors.push(`Invalid value for ${key}: expected a String.`);
                }
                break;

            default:
                errors.push(`Unknown validation type for ${key}.`);
        }
    }

    if (errors.length > 0) {
        throw new Error(`Validation failed: ${errors.join(", ")}`);
    }
};

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
    notes: validateNotes,
    profileData: validateProfile,
    text: validateText,
    updateData: validateUpdateData,
}

export default validate