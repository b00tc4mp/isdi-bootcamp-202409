import authenticateUser from './authenticateUser.js'

try {
    console.log(authenticateUser('jonasveronn', '123123123'))
} catch (error) {
    console.error(error)
}