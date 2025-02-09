import { User } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError, ValidationError } = errors

export default (userId, pictureToRemove) => {
    validate.id(userId, 'userId')
    validate.pictures([pictureToRemove])

    return (async () => {
        let user
        let updatedUser

        // Fetch user with lean() for better performance since we don't need the full document
        try {
            user = await User.findById(userId).lean()
        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!user) throw new NotFoundError('user not found')

        // Ensure pictures array exists and has content
        const pictures = user.pictures || []
        if (pictures.length === 0) throw new ValidationError('user has no pictures to remove')

        // Validate minimum pictures constraint
        if (pictures.length === 1) throw new ValidationError('cannot remove the last picture')

        // Find the picture index
        const index = pictures.indexOf(pictureToRemove)
        if (index === -1) throw new NotFoundError('picture not found')

        // Create update object for atomic operation
        const updateObject = {
            $pull: { pictures: pictureToRemove }
        }

        // Handle profile picture update if needed
        if (user.profilePicture === pictureToRemove) {
            // Choose the next picture if available, otherwise the previous one; if none, set to null.
            const newProfilePicture = pictures.length > 1 ?
                pictures[index + 1] || pictures[index - 1] : null
            updateObject.$set = { profilePicture: newProfilePicture }
        }

        // Perform atomic update and get updated document
        try {
            updatedUser = await User.findByIdAndUpdate(
                userId,
                updateObject,
                {
                    new: true,         // Return updated document
                    runValidators: true // Run model validators
                }
            )
        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!updatedUser) throw new SystemError('Failed to update user pictures')

        // Return updated pictures array and profile picture for frontend sync
        return {
            pictures: updatedUser.pictures,
            profilePicture: updatedUser.profilePicture
        }
    })()
}