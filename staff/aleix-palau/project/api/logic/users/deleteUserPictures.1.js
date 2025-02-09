// removeUserPicture.js
import { User } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId, pictureToRemove) => {
    validate.id(userId, 'userId')
    validate.pictures([pictureToRemove])

    return (async () => {
        let user

        // Fetch the user document (full document is needed to modify and save)
        try {
            user = await User.findById(userId)
        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!user) throw new NotFoundError('user not found')

        // Retrieve the pictures array (default to an empty array if not set)
        const pictures = user.pictures || []

        // Find the index of the picture to remove
        const index = pictures.indexOf(pictureToRemove)
        if (index === -1) throw new NotFoundError('picture not found')

        // Remove the picture from the array
        pictures.splice(index, 1)

        // If the removed picture was set as the profile picture (the first in the array), update it
        if (user.profilePicture === pictureToRemove) {
            user.profilePicture = pictures.length > 0 ? pictures[0] : null
        }

        // Update the user's pictures array
        user.pictures = pictures

        // Save the updated user document
        try {
            await user.save()
        } catch (error) {
            throw new SystemError(error.message)
        }

        // Return the updated pictures array
        return user.pictures
    })()
}