import 'dotenv/config'
import db from 'dat'
import toggleLikePost from './toggleLikePost.js'

db.connect(process.env.MONGO_URL)
  .then(() => {
    try {
      return toggleLikePost('6734ce44dfcd991dd513e654', '673601edf6de2635b1f15479')
        .then(console.log)
        .catch(console.error)
    } catch (error) {
      console.error(error)
    }
  })
  .catch(console.error)
  .finally(() => db.disconnect())

