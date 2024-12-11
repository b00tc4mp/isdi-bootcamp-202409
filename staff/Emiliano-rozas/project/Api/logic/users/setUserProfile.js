import { User } from 'dat'
import { validate, errors } from 'com'


const { SystemError, NotFounError } = errors

export default (userId, address, phone, city, country, postalCode) => {
    validate.id(userId, 'userId');
    validate.string(address, 'address');
    validate.string(phone, 'phone');
    validate.string(city, 'city');
    validate.string(country, 'country');
    validate.string(postalCode, 'postalCode');

    return User.findById(userId)
        .then(user => {
            if (!user) throw new NotFounError('user not found');

            user.profile.address = address
            user.profile.phone = phone
            user.profile.city = city
            user.profile.country = country
            user.profile.postalCode = postalCode

            return user.save();
        })
        .then(user => ({ message: 'Profile updated successfully', profile: user.profile }))
        .catch(error => {
            console.error(error);
            throw new SystemError(error.message);
        });
};