import registerUser from './registerUser.js'

try {
    registerUser('Carlos T', 'ctcarlos25@gmail.com', 'ctcarlos25', '123123123', '123123123')
} catch (error) {
    console.error(error)
}