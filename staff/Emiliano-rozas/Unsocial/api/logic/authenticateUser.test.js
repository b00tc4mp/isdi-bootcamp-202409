import authenticateUser from './authenticateUser'

try {
    console.log(authenticateUser('cocodrilo', '123123123'))

} catch (error) {
    console.error(error)
}