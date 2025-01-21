import { BasePack } from "dat";

import { validate, errors } from "com";

const { SystemError, NotFoundError } = errors

export default (userId, packName, description, quantity, unit, expiringTime, price, currency) => {
    validate.id(userId, 'userId')

    return (async () => {

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