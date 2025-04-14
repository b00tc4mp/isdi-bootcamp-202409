import authenticateUser from './authenticateUser.js'

try {
    console.log(authenticateUser('juanpablo', '123456'))
    console.log('logged in')
} catch (error) {
    console.error(error)
}