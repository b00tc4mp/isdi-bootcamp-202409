import { User } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId, pictures) => {
    validate.id(userId, 'userId')
    validate.pictures(pictures)

    return (async () => {
        let user

        // Fetch the user
        try {
            /* .lean() is used when you only need to read data without modifying it. It makes the query return a plain JavaScript object instead of a Mongoose document.
            In this case, you retrieve, update, and then save the user document.
            To call .save(), you need a full Mongoose document, which .lean() does not provide. */
            user = await User.findById(userId)
        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!user) throw new NotFoundError('user not found')

        // Combine new pictures with existing ones (max 3)
        user.pictures = [...(user.pictures || []), ...pictures].slice(0, 3)

        // Set the first picture as profile picture
        if (!user.profilePicture) user.profilePicture = pictures[0]

        await user.save()

        return user.pictures
    })()
}

// TODO: Manu daily -> llibreria sharp per a comprimir imatges i quan la guardi l'usuari el servidor que la comprimeixi. sharp diu el chaty?