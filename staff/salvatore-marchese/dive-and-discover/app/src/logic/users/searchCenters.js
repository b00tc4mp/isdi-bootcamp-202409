import { validate, errors } from 'com';

const { SystemError } = errors;

export default async (q, distance) => {
    // Validate query parameters
    if (q) validate.string(q, 'query');
    if (distance) validate.number(distance, 'distance');

    try {
        // Send GET request to the search API
        const response = await fetch(
            `http://${import.meta.env.VITE_API_URL}/users/search?q=${q}&distance=${distance}`,
            {
                method: 'GET',
                headers: { Authorization: `Bearer ${sessionStorage.token}` },
            }
        );

        // Handle response
        if (!response.ok) {
            const errorBody = await response.json();
            throw new errors[errorBody.error](errorBody.message);
        }

        return await response.json(); // Return the search results
    } catch (error) {
        throw new SystemError(error.message);
    }
};