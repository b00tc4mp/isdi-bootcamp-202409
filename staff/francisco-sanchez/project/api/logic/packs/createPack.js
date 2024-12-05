import { BasePack, Pack, User } from "dat";

import { validate, errors } from "com";

const { SystemError, NotFoundError } = errors

export default (
    userId,
    packName,
    packDescription,
    quantity,
    unit,
    expiringTime,
    price,
    currency
) => {
    //validate.provider(provider)

    return (async () => {

        /*    return User.findById(userId)
               .catch(error => { throw new SystemError(error.message) })
               .then(user => {
                   if (!user) throw new NotFoundError('user not found')
   
                   return Post.create({ author: userId, image, text })
                       .catch(error => { throw new SystemError(error.message) })
               })
               .then(_ => { }) */

        try {
            await BasePack.create({
                user: userId,
                packName,
                packDescription,
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