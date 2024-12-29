import { User } from 'dat'
import { errors } from 'com'

const { NotFoundError, SystemError } = errors

export default async (userId, requestedUserId) => {
  try {
    // Assuming you have some logic here to retrieve the user by their ID
    const user = await User.findById(userId)

    if (!user) {
      throw new NotFoundError('user not found')
    }

    // Proceed with logic after user is found, for example, returning profile
    return user // or whatever logic follows

  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error
    }
    // Handle other system errors
    throw new SystemError(error.message)
  }
}