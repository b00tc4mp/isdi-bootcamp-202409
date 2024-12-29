import { User } from 'dat'; 
import { validate, errors } from 'com'; // Common validation and errors

const { ValidationError, NotFoundError, SystemError } = errors;

export default async (city) => {
    try {
        // Validate the input city
        if (typeof city !== 'string' || city.trim().length === 0) {
            throw new ValidationError('Invalid city name');
        }

        let normalizedCity = city.trim().toLowerCase(); // Normalize city name
        normalizedCity = normalizedCity[0].toUpperCase()+normalizedCity.substring(1)

        // Query the database for dive centers in the specified city
        const diveCenters = await User.find({ city: normalizedCity, role: 'center' }).lean();

        if (!diveCenters || diveCenters.length === 0) {
            throw new NotFoundError(`No dive centers found in ${city}`);
        }

        return diveCenters; // Return the list of dive centers
    } catch (error) {
        console.error('Error in searchDiveCenters:', error);
        throw new SystemError(error.message);
    }
};