import { validate, errors } from 'com';

const { SystemError } = errors;

export default async (city) => {
    if (!city || typeof city !== 'string') {
        throw new Error('City is required');
    }

    return fetch(`http://${import.meta.env.VITE_API_URL}/users/diver/search?city=${encodeURIComponent(city)}`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${sessionStorage.token}` },
    })
        .then((response) => { 
            if (!response.ok) {
                return response.json().then((error) => {
                    throw new Error(error.message || 'An error occurred.');
                }).catch(() => {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                });
            }
            return response.json();
        })
        .catch((error) => {
            console.error('Error in searchDiveCenters:', error);
            throw new SystemError(error.message);
        });
};