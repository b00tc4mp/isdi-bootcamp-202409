import 'dotenv/config'
import db from 'dat'
import getComments from './getComments.js'

db.connect(process.env.MONGO_URL_TEST)
  .then(() => {
    try {
      return getComments('', '')
        .then(console.log)
        .catch(console.error)
    } catch (error) {
      console.error(error)
    }
  })
  .catch(console.error)
  .finally(() => db.disconnect())
