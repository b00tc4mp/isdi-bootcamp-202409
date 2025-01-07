import { User } from "dat";

import { validate, errors } from 'com'

const { SystemError, NotFoundError, OwnershipError } = errors

export default (userId, targetUserId, username, email, name, surname1, surname2, dni, biography, country, province, city, postalCode, address1, address2, number, flat, legalName, website) => {
    validate.id(userId, 'userId')

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) {
                console.error(error.message)
                throw new NotFoundError('Pack not found')
            }

            if (targetUserId !== userId) {
                throw new OwnershipError('You cannot update the profile from other user')
            }

            return User.findByIdAndUpdate(targetUserId, { username, email, name, surname1, surname2, dni, biography, country, province, city, postalCode, address1, address2, number, flat, legalName, website }, { new: true, runValidators: true })
                .catch(error => {
                    throw new SystemError(error.message)
                })
        })
}