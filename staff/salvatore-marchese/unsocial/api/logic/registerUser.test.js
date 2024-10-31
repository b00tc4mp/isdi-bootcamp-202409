import registerUser from './registerUser.js'

try {
    registerUser('Mario', 'mario@gmail.com', 'SuperMario', '12341234', '12341234')
} catch (error) {
    console.error(error)
}