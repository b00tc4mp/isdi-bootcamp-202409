import { User } from 'dat'; // Use the User model
import { validate } from 'com';

export default async (query, distance) => {
    // Validate input parameters
    if (query) validate.string(query, 'query');
    if (distance) validate.number(distance, 'distance');

    // Build search query for MongoDB
    const searchCriteria = { role: 'DiveCenter' }; // Only search for DiveCenters

    if (query) {
        searchCriteria.name = { $regex: query, $options: 'i' }; // Case-insensitive match
    }
    if (distance > 0) {
        searchCriteria.distance = { $lte: distance }; // Match within the specified distance
    }

    // Perform the search
    const results = await User.find(searchCriteria).lean();
    return results;
};