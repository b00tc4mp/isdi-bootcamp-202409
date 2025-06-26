import { User } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId, pictures) => {
    validate.id(userId, 'userId')
    validate.pictures(pictures)

    return (async () => {
        try {
            // Fetch the user
            const user = await User.findById(userId).lean()
            if (!user) throw new NotFoundError('user not found')

            // Prepare the merged pictures array respecting the 3-picture limit
            const existingPictures = user.pictures || []
            const mergedPictures = Array.from(new Set([...existingPictures, ...pictures])).slice(0, 3)

            // Determine if profile picture needs updating
            // If no profile picture exists, use the first picture in the merged array
            const updateObject = {
                $set: {
                    pictures: mergedPictures
                }
            }

            // Only update profile picture if one doesn't exist and we have pictures
            if (!user.profilePicture && mergedPictures.length > 0)
                updateObject.$set.profilePicture = mergedPictures[0]

            // Perform atomic update and get updated document
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                updateObject,
                {
                    new: true,
                    runValidators: true
                }
            )

            if (!updatedUser) throw new SystemError('Failed to update user pictures')

            // Return updated pictures and profile picture
            return {
                pictures: updatedUser.pictures,
                profilePicture: updatedUser.profilePicture || '/images/default-profile.jpeg'
            }
        } catch (error) {
            if (error instanceof NotFoundError)
                throw error

            throw new SystemError(error.message)
        }
    })()
}