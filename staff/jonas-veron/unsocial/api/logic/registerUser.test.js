import registerUser from './registerUser.js'

try {
    console.log(registerUser('jonas', 'jonas@veron.com', 'jonasveronn', '123123123', '123123123'))
} catch (error) {
    console.error(error)
}