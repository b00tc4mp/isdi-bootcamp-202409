import registerUser from './registerUser.js'

try {
    registerUser('Ana Bohuele', 'ana@bohuele.com', 'anabo', '123', '123')
} catch (error) {
    console.error(error)
}