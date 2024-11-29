import 'dotenv/config'
import db from 'dat'
import deletePost from './deletePost.js'

db.connect(process.env.MONGO_URL)
  .then(() => {
    try {
      return deletePost('6734ce44dfcd991dd513e654', '6735ffb17cdbe1b6497f5afd')
        .then(console.log)
        .catch(console.error)
    } catch (error) {
      console.error(error)
    }
  })
  .catch(console.error)
  .finally(() => db.disconnect())
