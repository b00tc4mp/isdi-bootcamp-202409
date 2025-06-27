import { FaunaFlora, User } from "dat";
import { errors, validate } from "com";

const { NotFoundError, SystemError } = errors;

export default function getFaunaFloraByCity(userId, city) {
    validate.id(userId)
    validate.city(city)

    const normalizedCity = city.trim().toLowerCase(); // Normalize city input

    return (async () => {
        let user, faunaFlora

        try {
            user = await User.findById(userId)
        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!user) {
            throw new NotFoundError('user not found');
        }

        try {
            // Fetch fauna and flora data (case-insensitive search)
            faunaFlora = await FaunaFlora.findOne({ city: { $regex: `^${normalizedCity}$`, $options: "i" } }, '-__v').lean();
        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!faunaFlora) {
            throw new NotFoundError(`No fauna and flora data found for ${city}`);
        }

        faunaFlora.id = faunaFlora._id.toString()
        delete faunaFlora._id

        return faunaFlora;
    })()
}