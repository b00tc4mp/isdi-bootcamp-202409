import registerUser from './registerUser.js'

try {
    registerUser('Pin Ocho', 'pin@ocho.com', 'pinocho', '123123123', '123123123')
} catch (error) {
    console.error(error)
}