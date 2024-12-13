import { /* validate, */ errors } from 'com'
import getUserByEmail from './getUserByEmail.js'
import getUserByUsername from './getUserByUsername.js'

const { SystemError, NotFoundError } = errors

export default async (userId, searchTerm) => {
    let customerUserId

    try {
        customerUserId = getUserByEmail(userId, searchTerm)
        if (customerUserId) {
            return customerUserId
        }
    } catch (error) {
        throw new SystemError(error.message);
    }

    try {
        customerUserId = getUserByUsername(userId, searchTerm)
        if (customerUserId) {
            return customerUserId
        }
    } catch (error) {
        throw new SystemError(error.message)
    }

    throw new NotFoundError('Customer not found.')

}