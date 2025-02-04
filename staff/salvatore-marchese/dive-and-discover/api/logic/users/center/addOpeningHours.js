/* import { User, OpeningHours } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

const { validateText } = validate


export default function addOpeningHours(userId, day, openTime, closeTime) {
    validate.id(userId, 'userId')
    
     // Validate the day is a number and it is between 1 and 7
     if (typeof day !== 'number' || day < 1 || day > 7) {
        throw new Error("Invalid day: must be a number between 1 and 7");
    }
    if (!openTime || !closeTime) {
        throw new Error(openTime ? 'closeTime is required' : 'openTime is required');
    }

   try {
        validateText.text(openTime, 'openTime');
        validateText.text(closeTime, 'closeTime');
    } catch (error) {
        throw new SystemError(error.message); // Handle any validation errors
    }

    // Proceed with user lookup and opening hours creation
    try {
        const user = await User.findById(userId).lean();
        if (!user) throw new NotFoundError('user not found');

        const openingHours = new OpeningHours({ day, openTime, closeTime });
        await User.findByIdAndUpdate(userId, { $push: { openingHours } }, { new: true });
    } catch (error) {
        throw new SystemError(error.message);
    }
}

     */

import { User, OpeningHours } from 'dat';
import { validate, errors } from 'com';

const { NotFoundError, SystemError } = errors;
const { validateText } = validate;

export default function addOpeningHours(userId, day, openTime, closeTime) {
    // Validate inputs
    validate.id(userId, 'userId');
    
    // Validate day
    if (typeof day !== 'number' || day < 1 || day > 7) {
        throw new SystemError("Invalid day: must be a number between 1 and 7");
    }

    // Ensure openTime and closeTime are provided
    if (!openTime || !closeTime) {
        throw new SystemError(openTime ? 'closeTime is required' : 'openTime is required');
    }

    try {
        // Validate the time fields
        validateText.text(openTime, 'openTime');
        validateText.text(closeTime, 'closeTime');
    } catch (error) {
        throw new SystemError(error.message); // Handle any validation errors
    }

    return (async () => {
        let user;
        
        // Fetch the user from the database
        try {
            user = await User.findById(userId).lean();
        } catch (error) {
            throw new SystemError(error.message);
        }

        // Handle case where user is not found
        if (!user) {
            throw new NotFoundError('User not found');
        }

        // Create the opening hours object
        const openingHours = new OpeningHours({ day, openTime, closeTime });

        try {
            // Add the opening hours to the user's record
            await User.findByIdAndUpdate(userId, { $push: { openingHours } }, { new: true });
        } catch (error) {
            throw new SystemError(`Error adding opening hours: ${error.message}`);
        }

        return { message: 'Opening hours added successfully' };
    })();
}