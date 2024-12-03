import { BasePack, Pack } from "dat";

import { validate, errors } from "com";

const { SystemError } = errors

export default (
    user,
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
                user,
                packName,
                description,
                quantity,
                unit,
                expiringTime,
                price,
                currency
            })
        } catch (error) {
            throw new SystemError(error.message)
            console.log(error.code)
            console.error(error)
        }
    })()
}