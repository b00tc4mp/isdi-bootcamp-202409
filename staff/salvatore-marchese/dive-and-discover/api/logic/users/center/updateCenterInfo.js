import { User } from 'dat';
import { validate, errors } from 'com';

const { NotFoundError, SystemError } = errors;

export default (userId, data) => {
    validate.id(userId, 'userId');

    const { name, email, password, passwordRepeat, address, country, city, postcode, telephone } = data;

    // Validate each field only if it's provided
    if (name) validate.name(name);
    if (email) validate.email(email);
    if (password) validate.password(password);
    if (password && passwordRepeat) validate.passwordsMatch(password, passwordRepeat);
    if (address) validate.address(address);
    if (country) validate.country(country);
    if (city) validate.city(city);
    if (postcode) validate.postcode(postcode);
    if (telephone) validate.telephone(telephone);

    let user;

    try {
        user = User.findById(userId).lean();
    } catch (error) {
        throw new SystemError(error.message);
    }

    if (!user) throw new NotFoundError('User not found');

    // Prepare the update data by only including the fields that need updating
    const dataToBeUpdated = {};
    if (name) dataToBeUpdated.name = name;
    if (email) dataToBeUpdated.email = email;
    if (password) dataToBeUpdated.password = password;
    if (address) dataToBeUpdated.address = address;
    if (country) dataToBeUpdated.country = country;
    if (city) dataToBeUpdated.city = city;
    if (postcode) dataToBeUpdated.postcode = postcode;
    if (telephone) dataToBeUpdated.telephone = telephone;

    let updatedUser;

    try {
        updatedUser = User.findByIdAndUpdate(userId, dataToBeUpdated, { new: true }).lean();
    } catch (error) {
        throw new SystemError(error.message);
    }

    return updatedUser;
};