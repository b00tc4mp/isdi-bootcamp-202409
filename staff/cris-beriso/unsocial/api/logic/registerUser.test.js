import 'dotenv/config'
import db from 'dat'
import registerUser from './registerUser.js'

db.connect(process.env.MONGO_URL)
  .then(() => {
    try {
      return registerUser('Yannick', 'yan@nick.com', 'yanscf', 'criscris', 'criscris')
        .then(() => console.log('user registered'))
        .catch(console.error)
    } catch (error) {
      console.error(error)
    }
  })
  .catch(console.error)
  .finally(() => db.disconnect())
