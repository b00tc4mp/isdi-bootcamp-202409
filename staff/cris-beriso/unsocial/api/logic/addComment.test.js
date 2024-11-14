import 'dotenv/config'
import db from 'dat'
import addComment from './addComment.js'

db.connect(process.env.MONGO_URL)
  .then(() => {
    try {
      return addComment('6734ce1c818dbb1cce23d08e', '673601edf6de2635b1f15479', '(L)')
        .then(console.log)
        .catch(console.error)
    } catch (error) {
      console.error(error)
    }
  })
  .catch(console.error)
  .finally(() => db.disconnect())