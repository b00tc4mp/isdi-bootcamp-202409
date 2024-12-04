import 'dotenv/config'
import db from 'dat'
import addComment from './addComment.js'

db.connect(process.env.MONGO_URL_TEST)
  .then(() => {
    try {
      return addComment('6750854385bc811dd4b7eb27', '6750854585bc811dd4b7eb57', 'Yeaaaaaaaaaaaaaaaaaah')
        .then(console.log)
        .catch(console.error)
    } catch (error) {
      console.error(error)
    }
  })
  .catch(console.error)
  .finally(() => db.disconnect())