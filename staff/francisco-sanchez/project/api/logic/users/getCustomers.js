import { User, Pack } from 'dat';
import { errors, validate } from 'com';

const { SystemError, NotFoundError } = errors;

export default (userId) => {
    validate.id(userId, 'userId')

    return (async () => {
        let user, userCustomers

        try {
            user = await User.findById(userId).lean()
        } catch (error) {
            throw new SystemError(error.message)
        }
        if (!user) throw new NotFoundError('User not found')
        if (!user.customers || user.customers.length === 0) { throw new NotFoundError('customers not found') }

        //Filter the objectId's with $in operator to find user names
        userCustomers = await User.find(
            { _id: { $in: user.customers } },
            { _id: 1, name: 1, surname1: 1, email: 1 }).lean()


        try {
            // Agrega el número de packs contratados por cada cliente
            const customersWithPackCount = await Promise.all(
                userCustomers.map(async (customer) => {
                    const packCount = await Pack.countDocuments({ customer: customer._id, provider: userId })

                    customer.id = customer._id.toString()
                    delete customer._id

                    return { ...customer, packCount }
                })
            )
            //return userCustomers
            return customersWithPackCount

        } catch (error) {
            throw new SystemError(error.message)
        }
    })()
}