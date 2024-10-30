import registerUser from './registerUser.js'

try {
  registerUser('Yannick', 'yan@nick.com', 'yannick', 'criscris', 'criscris')
} catch (error) {
  console.error(error)
}
