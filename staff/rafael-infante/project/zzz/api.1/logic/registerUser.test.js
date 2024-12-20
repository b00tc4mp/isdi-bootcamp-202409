import 'dotenv/config'
import db from '../../dat/index.js'

import registerUser from './registerUser.js'

db.connect(process.env.MONGO_URL_TEST)
  .then(() => {
    try {
      return registerUser('Rive Lino', 'rive@lino.com', 'rivelino', '123123123', '123123123')
        .then(console.log)
        .catch(console.error)
    } catch (error) {
      console.error()
    }
  })
  .catch(console.error)
  .finally(() => db.disconnect())