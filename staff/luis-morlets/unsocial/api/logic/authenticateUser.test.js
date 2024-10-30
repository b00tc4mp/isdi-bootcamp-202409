import authenticateUser from './authenticateUser.js'

try {
    console.log(authenticateUser('pinocho', '123123123'))
} catch (error) {
    console.error(error)
}