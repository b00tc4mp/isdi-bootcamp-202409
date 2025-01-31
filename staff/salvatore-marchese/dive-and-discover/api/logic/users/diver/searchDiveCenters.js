import { User } from 'dat';
import { validate, errors } from 'com'; 

const { ValidationError, NotFoundError, SystemError } = errors;

export default (userId, city) => {
    validate.id(userId, 'userId');
    validate.city(city, 'city');

    const normalizedCity = city
        .trim() // Remove leading/trailing spaces
        .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
        .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word

    // Create a regex pattern to match partial city names (e.g., "Tossa" for "Tossa de Mar")
    const cityRegex = new RegExp(`\\b${normalizedCity}\\b`, 'i'); // Case-insensitive match

    return Promise.all([
        User.findById(userId).lean(),
        User.find({ city: { $regex: cityRegex }, role: 'center' }).lean()
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, diveCenters]) => {
            if (!user) throw new NotFoundError('user not found');

            if (!diveCenters || diveCenters.length === 0) {
                throw new NotFoundError(`No dive centers found in ${city}`);
            }

            diveCenters.forEach(diveCenter => {
                diveCenter.id = diveCenter._id.toString();
                delete diveCenter._id;
            });

            return diveCenters;
        });
};