import authenticateUser from './authenticateUser.js'

try {
    console.log(authenticateUser('SuperMario', '12341234'))
} catch (error) {
    console.error(error)
}