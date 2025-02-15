/* import { validate, errors } from 'com'
import Discovery from 'dat'
const { ValidationError, NotFoundError, SystemError } = errors

export default async (city) => {
    try {
        // Validate city input
        if (!city || typeof city !== 'string' || city.trim().length === 0) {
            throw new ValidationError('Invalid city name');
        }

        const normalizedCity = city.trim().toLowerCase();

        // Fetch discovery info for the city
        const discoveryData = await Discovery.findOne({ city: normalizedCity }).lean();

        if (!discoveryData) {
            throw new NotFoundError(`No discovery data found for ${city}`);
        }

        return discoveryData;
    } catch (error) {
        console.error('Error in getDiscovery:', error);
        throw new SystemError(error.message);
    }
}; */

import { validate, errors } from "com";
import Discovery from "dat";

const { ValidationError, NotFoundError, SystemError } = errors;

export default function getDiscovery(city) {
    // Validate city input
    if (!city || typeof city !== "string" || city.trim().length === 0) {
        throw new ValidationError("Invalid city name");
    }

    const normalizedCity = city.trim().toLowerCase();

    try {
        // Fetch discovery info for the city
        const discoveryData = Discovery.findOne({ city: normalizedCity }).lean();

        if (!discoveryData) {
            throw new NotFoundError(`No discovery data found for ${city}`);
        }

        return discoveryData;
    } catch (error) {
        console.error("Error in getDiscovery:", error);
        throw new SystemError(error.message);
    }
} 