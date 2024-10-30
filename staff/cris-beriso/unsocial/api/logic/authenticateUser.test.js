import authenticateUser from './authenticateUser.js'

try {
  console.log(authenticateUser('beriso', 'criscris'))
} catch (error) {
  console.error(error)
}