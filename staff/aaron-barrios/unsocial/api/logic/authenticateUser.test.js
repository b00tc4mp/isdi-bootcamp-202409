import authenticateUser from './authenticateUser.js'

try {
    console.log(authenticateUser('Aaron', '123'))
} catch (error) {
    console.error(error)
}