/* import {FaunaFlora} from 'dat';
import { errors } from 'com';

const { NotFoundError, SystemError, ValidationError } = errors;

export default async function getFaunaFloraByCity(city) {
    try {
        // Validate input
        if (!city || typeof city !== 'string' || city.trim() === '') {
            throw new ValidationError('City is required and must be a non-empty string.');
        }

        const normalizedCity = city.trim().toLowerCase(); // Normalize city input

        // Fetch fauna and flora data from the database
        const faunaFloraData = await FaunaFlora.findOne({ city: normalizedCity }).lean();
console.log(faunaFloraData, normalizedCity)
        if (!faunaFloraData) {
            throw new NotFoundError(`No fauna and flora data found for ${city}`);
        }

        return faunaFloraData;
    } catch (error) {
        console.error('Error in getFaunaFloraByCity:', error);
        throw new SystemError(error.message || 'An unexpected error occurred while fetching data.');
    }
} */

import { FaunaFlora } from "dat";
import { errors } from "com";

const { NotFoundError, SystemError, ValidationError } = errors;

export default function getFaunaFloraByCity(city) {
    // Validate input
    if (!city || typeof city !== "string" || city.trim() === "") {
        throw new ValidationError("City is required and must be a non-empty string.");
    }

    const normalizedCity = city.trim().toLowerCase(); // Normalize city input

    try {
        // Fetch fauna and flora data (case-insensitive search)
        const faunaFloraData = FaunaFlora.findOne({ city: { $regex: `^${normalizedCity}$`, $options: "i" } }).lean();

        if (!faunaFloraData) {
            throw new NotFoundError(`No fauna and flora data found for ${city}`);
        }

        return faunaFloraData;
    } catch (error) {
        console.error("Error in getFaunaFloraByCity:", error);
        throw new SystemError(error.message || "An unexpected error occurred while fetching data.");
    }
}