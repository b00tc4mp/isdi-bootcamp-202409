import 'dotenv/config'
import db from 'dat'
import removeComment from './removeComment.js'

db.connect(process.env.MONGO_URL_TEST)
  .then(() => {
    try {
      return removeComment('6750854385bc811dd4b7eb27', '6750854585bc811dd4b7eb57', '675085bcf202ab05ec118825')
        .then(console.log)
        .catch(console.error)
    } catch (error) {
      console.error(error)
    }
  })
  .catch(console.error)
  .finally(() => db.disconnect())
