import User from '../models/User.js'

// Get user data
export const getUserData = async (userId) => {
  const user = await User.findById(userId)
  if (!user) throw new Error('User not found')
  return user
}

// Update user data
export const updateUserData = async (userId, data) => {
  const user = await User.findById(userId)
  if (!user) throw new Error('User not found')
  
  // Update user fields based on the data passed
  user.name = data.name || user.name
  user.email = data.email || user.email
  user.password = data.password || user.password
  

  await user.save()
  return user
}