import findUserIdbyEmailOrUsername from "../logic/users/findUserIdbyEmailOrUsername.js"

try {
    const userId = await findUserIdbyEmailOrUsername('nomadwebsljhkljhlkjhlkjh')
    console.log('User found:', userId)
} catch (error) {
    console.error('Error finding user:', error.message)
}