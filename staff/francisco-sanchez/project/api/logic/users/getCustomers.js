import { User } from 'dat';
import { errors } from 'com';


const { SystemError, NotFoundError } = errors;

export default async (userId, targetUserId) => {

    try {
        //Find the users
        const user = await User.findById(targetUserId).lean()
        if (!user) throw new NotFoundError('User not found')

        //Check and return if have customers
        if (!user.customers || user.customers.length === 0) {
            return ('no customers found')
            //return []
        }

        //Filter the objectId's with $in operator to find user names
        const userCustomers = await User.find(
            { _id: { $in: user.customers } },
            { _id: 1, name: 1, surname1: 1 }).lean()
        return userCustomers
    } catch (error) {
        throw new SystemError(error.message)
    }
}