import { User } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError, ValidationError } = errors

export default (userId, pictureToRemove) => {
    validate.id(userId, 'userId')
    validate.pictures([pictureToRemove])

    return (async () => {
        try {
            // Fetch user
            const user = await User.findById(userId).lean()
            if (!user) throw new NotFoundError('user not found')

            // Ensure pictures array exists and has content
            const pictures = user.pictures || []
            if (pictures.length === 0)
                throw new ValidationError('user has no pictures to remove')

            // Ensure picture exists
            const index = pictures.indexOf(pictureToRemove)
            if (index === -1)
                throw new NotFoundError('picture not found in user profile')

            // Validate minimum pictures
            if (pictures.length === 1)
                throw new ValidationError('cannot remove the last picture')

            // Prepare update object
            const updateObject = {
                $pull: { pictures: pictureToRemove }
            }

            // Handle profile picture update if needed
            if (user.profilePicture === pictureToRemove) {
                // Choose a replacement profile picture
                let newProfilePicture = null

                // Try to get the next picture, or previous if at the end
                if (pictures.length > 1) {
                    const remainingPictures = pictures.filter(pic => pic !== pictureToRemove)
                    newProfilePicture = remainingPictures[0]
                }

                updateObject.$set = { profilePicture: newProfilePicture }
            }

            // Perform atomic update
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                updateObject,
                {
                    new: true,
                    runValidators: true
                }
            )

            if (!updatedUser) throw new SystemError('Failed to update user pictures')

            return {
                pictures: updatedUser.pictures,
                profilePicture: updatedUser.profilePicture || '/images/default-profile.jpeg'
            }
        } catch (error) {
            if (error instanceof NotFoundError || error instanceof ValidationError)
                throw error

            throw new SystemError(error.message)
        }
    })()
}