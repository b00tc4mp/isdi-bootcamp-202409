import { User } from 'dat'
import { validate, errors } from 'com'
import { fileStorage } from '../../routes/helpers'

const { SystemError, NotFoundError } = errors

export default (userId, images) => {
    validate.id(userId, 'userId')
    validate.images(images)

    return (async () => {
        let user

        try {
            // .lean() is used when you only need to read data without modifying it. It makes the query return a plain JavaScript object instead of a Mongoose document
            // In this case, you retrieve, update, and then save the user document
            // To call .save(), you need a full Mongoose document, which .lean() does not provide.
            user = await User.findById(userId)
        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!user) throw new NotFoundError('user not found')

        const uploadedPictures = []

        try {
            for (let image of images) {
                const filePath = await fileStorage(image) // Save picture to a storage system
                uploadedPictures.push(filePath)
            }

            // Save pictures in the database
            user.pictures = user.pictures || []
            user.pictures.push(...uploadedPictures)
            if (!user.profilePicture) {
                user.profilePicture = uploadedPictures[0] // Set the first picture as profile picture
            }

            await user.save()
        } catch (error) {
            throw new SystemError(error.message)
        }
    })()
}