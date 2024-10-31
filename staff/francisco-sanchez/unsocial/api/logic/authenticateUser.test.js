import authenticateUser from './authenticateUser.js'

try {
    console.log(authenticateUser('risto', 'risto'))
} catch (error) {
    console.error(error)
}