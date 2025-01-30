import { BasePack, User } from "dat";

import { validate, errors } from "com";

const { SystemError, NotFoundError } = errors

export default (userId, packName, description, quantity, unit, expiringTime, price, currency) => {
    validate.id(userId, 'userId')
    validate.packName(packName)
    validate.description(description)
    //validate.number(quantity)
    validate.text(unit, 'unit')
    //validate.integerNum(expiringTime)
    //validate.number(price)
    validate.text(currency, 'currency')


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
            await BasePack.create({ user: userId, packName, description, quantity, unit, expiringTime, price, currency })
        } catch (error) {
            throw error
        }
    })()
}