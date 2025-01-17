import { User } from 'dat'
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
}