/* import { validate, errors } from 'com';

const { ValidationError, SystemError } = errors;

export default async function getFaunaFloraByCity(city) {
    if (!city || typeof city !== 'string') {
        throw new ValidationError('City is required and must be a string');
    }

    try {
        const response = await fetch(
            `http://${import.meta.env.VITE_API_URL}/users/diver/faunaFlora?city=${encodeURIComponent(city)}`
        );

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }

        return response.json(); // Return the fauna and flora data
    } catch (error) {
        throw new SystemError(error.message || 'Failed to fetch fauna and flora data');
    }
} */

    import { validate, errors } from 'com';

    const { ValidationError, SystemError } = errors;
    
    export default async function getFaunaFloraByCity(city) {
        // Validate the input
        if (!city || typeof city !== 'string') {
            throw new ValidationError('City is required and must be a string');
        }
    
        try {
            // Make the API request
            const response = await fetch(
                `http://${import.meta.env.VITE_API_URL}/users/diver/faunaFlora?city=${encodeURIComponent(city)}`,
                {
                    method: 'GET',
                    headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }, // Include token if required
                }
            );
    
            if (!response.ok) {
                const { message } = await response.json();
                throw new ValidationError(message); // Use ValidationError for bad responses
            }
    
            return await response.json(); // Return the fauna and flora data
        } catch (error) {
            if (error instanceof ValidationError) {
                throw error; // Rethrow if it's a validation error
            }
            console.error('Error fetching fauna and flora:', error);
            throw new SystemError(error.message || 'Failed to fetch fauna and flora data');
        }
    }