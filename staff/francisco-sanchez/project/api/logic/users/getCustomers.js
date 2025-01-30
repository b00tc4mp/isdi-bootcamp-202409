import { User, Pack } from 'dat';
import { errors, validate } from 'com';

const { SystemError, NotFoundError } = errors;

export default async (userId) => {
    validate.id(userId, 'userId')

    try {
        //Find the users
        const user = await User.findById(userId).lean()
        if (!user) throw new NotFoundError('User not found')

        //Check and return if have customers
        if (!user.customers || user.customers.length === 0) {
            throw new NotFoundError('customers not found')
        }

        //Filter the objectId's with $in operator to find user names
        const userCustomers = await User.find(
            { _id: { $in: user.customers } },
            { _id: 1, name: 1, surname1: 1, email: 1 }).lean()


        // Agrega el número de packs contratados por cada cliente
        const customersWithPackCount = await Promise.all(
            userCustomers.map(async (customer) => {
                const packCount = await Pack.countDocuments({ customer: customer._id })

                customer.id = customer._id.toString()
                delete customer._id

                return { ...customer, packCount }
            })
        )
        //return userCustomers
        return customersWithPackCount

    } catch (error) {
        if (error instanceof NotFoundError) {
            throw error
        } else {
            throw new SystemError(error.message)
        }
    }
}