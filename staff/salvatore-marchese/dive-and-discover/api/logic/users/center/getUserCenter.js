/*  import { User } from 'dat'
  import { errors } from 'com'
  
  const { NotFoundError, SystemError } = errors
  
  export default async (userId, requestedUserId) => {
    try {
      // Check if the requested user ID matches the logged-in user's ID (if needed)
      if (userId !== requestedUserId) {
        throw new SystemError('User is not authorized to access this profile')
      }
  
      // Retrieve the user by their ID
      const user = await User.findById(userId)
  
      if (!user) {
        throw new NotFoundError('User not found')
      }
  
      return user 
  
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error
      }
      // Handle other system errors
      throw new SystemError(error.message)
    }
  } */

    import { User } from 'dat'
    import { errors } from 'com'
    
    const { NotFoundError, SystemError } = errors
    
    export default async (userId, requestedUserId) => {
      try {
        // Check if the requested user ID matches the logged-in user's ID (if needed)
        if (userId !== requestedUserId) {
          throw new SystemError('User is not authorized to access this profile')
        }
    
        // Retrieve the user by their ID
        const user = await User.findById(userId).lean() // .lean() to get plain JavaScript object
    
        if (!user) {
          throw new NotFoundError('User not found')
        }
    
        // Return the user profile (you can adjust this to return only specific data if needed)
        return user
    
      } catch (error) {
        if (error instanceof NotFoundError) {
          throw error
        }
        // Handle other system errors
        throw new SystemError(error.message)
      }
    }