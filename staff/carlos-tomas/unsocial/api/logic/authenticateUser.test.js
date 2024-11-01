import authenticateUser from './authenticateUser.js'

try {
    console.log(authenticateUser('pepitogrillo', '123123123'))
} catch (error) {
    console.error(error)
}