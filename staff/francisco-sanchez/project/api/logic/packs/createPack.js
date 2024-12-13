import { BasePack, Pack, User } from "dat";

import { validate, errors } from "com";

const { SystemError, NotFoundError } = errors

export default (
    userId,
    packName,
    description,
    quantity,
    unit,
    expiringTime,
    price,
    currency
) => {
    //validate.provider(provider)

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