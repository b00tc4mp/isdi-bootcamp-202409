/* import { User } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default async (userId, data) => {
    validate.id(userId, 'userId')
    validate.name(name)
    validate.email(email)
    validate.password(password)
    validate.passwordsMatch(password, passwordRepeat)
    validate.address(address)
    validate.country(country)
    validate.city(city)
    validate.postcode(postcode)
    validate.telephone(telephone)
    

    try {
        let user = await User.findById(userId).lean()
        if (!user) throw new NotFoundError('user not found')

        //const dataToBeUpdated = {address: data['address']}
        const dataToBeUpdated = {
            ...user,
            ...data
        }

        // Return the updated user directly
        // TODO - VALIDATE AND SAVE THE ADDITIONAL INFO
        return await User.findByIdAndUpdate(userId, dataToBeUpdated, { new: true }).lean()

    } catch (error) {
        if (error instanceof NotFoundError) {
            throw error
        }
        throw new SystemError(error.message)
    }
} */

import { User } from 'dat';
import { validate, errors } from 'com';

const { SystemError, NotFoundError } = errors;

export default async (userId, data) => {
    // Validate `userId`
    validate.id(userId, 'userId');

    // Validate each field in `data`
    const { name, email, password, passwordRepeat, address, country, city, postcode, telephone } = data;

    // Perform validation
    try {
        if (name) validate.name(name);
        if (email) validate.email(email);
        if (password) validate.password(password);
        if (password && passwordRepeat) validate.passwordsMatch(password, passwordRepeat);
        if (address) validate.address(address);
        if (country) validate.country(country);
        if (city) validate.city(city);
        if (postcode) validate.postcode(postcode);
        if (telephone) validate.telephone(telephone);
    } catch (validationError) {
        throw new SystemError(`Validation error: ${validationError.message}`);
    }

    try {
        // Fetch the user
        const user = await User.findById(userId).lean();
        if (!user) throw new NotFoundError('User not found');

        // Prepare data to be updated
        const dataToBeUpdated = {
            ...user,
            ...data,
        };

        // Save the updated user
        const updatedUser = await User.findByIdAndUpdate(userId, dataToBeUpdated, { new: true }).lean();

        return updatedUser;
    } catch (error) {
        if (error instanceof NotFoundError) {
            throw error;
        }
        throw new SystemError(error.message);
    }
};