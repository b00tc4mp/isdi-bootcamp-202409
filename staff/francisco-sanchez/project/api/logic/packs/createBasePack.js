import { BasePack, User } from "dat";

import { validate, errors } from "com";

const { SystemError, NotFoundError } = errors

export default (userId, packName, description, quantity, unit, expiringTime, price, currency) => {
    validate.id(userId, 'userId')
    //TODO: missing validations


    return (async () => {
        let user

        try {
            user = await User.findById(userId)
        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!user) {
            throw new NotFoundError(('user not found'))
        }

        try {
            await BasePack.create({
                user: userId,
                packName,
                description,
                quantity,
                unit,
                expiringTime,
                price,
                currency
            })
        } catch (error) {
            console.log(error.code)
            console.error(error)
            throw new SystemError(error.message)
        }
    })()
}