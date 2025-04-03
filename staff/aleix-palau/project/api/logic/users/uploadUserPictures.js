import { User } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

const DEFAULT_PROFILE_PICTURE = 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg'

export default (userId, pictures) => {
    validate.id(userId, 'userId')
    validate.pictures(pictures)

    return (async () => {
        let user
        let updatedUser

        // Fetch the user with lean() since we'll use atomic updates
        try {
            user = await User.findById(userId).lean()
        } catch (error) {
            throw new SystemError(error.message)
        }

        if (!user) throw new NotFoundError('user not found')

        // Prepare the merged pictures array while respecting the 3-picture limit
        const existingPictures = user.pictures || []
        const mergedPictures = Array.from(new Set([...existingPictures, ...pictures])).slice(0, 3)

        // Determine if profile picture needs updating
        const needsProfilePicture = !user.profilePicture || user.profilePicture === DEFAULT_PROFILE_PICTURE
        const newProfilePicture = needsProfilePicture ? (mergedPictures[0] || DEFAULT_PROFILE_PICTURE) : user.profilePicture

        // Create update object for atomic operation
        const updateObject = {
            $set: {
                pictures: mergedPictures
            }
        }

        // Only include profile picture update if it's changing
        if (newProfilePicture !== user.profilePicture) {
            updateObject.$set.profilePicture = newProfilePicture
        }

        // Perform atomic update and get updated document
        try {
            updatedUser = await User.findByIdAndUpdate(
                userId,
                updateObject,
                {
                    new: true, // Return updated document
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
// TODO: la url d la default picture? mirar si aixo Determine if profile picture needs updating es rellevant