import authenticateUser from './authenticateUser.js'

try {
    console.log(authenticateUser('cocodrilo', '123123123'))
} catch (error) {
    console.error(error)
}