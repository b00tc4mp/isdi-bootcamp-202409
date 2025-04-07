import 'dotenv/config'
import db from 'dat'
import removeComment from './removeComment.js'

db.connect(process.env.MONGO_URL)
  .then(() => {
    try {
      return removeComment('6734ce1c818dbb1cce23d08e', '673601edf6de2635b1f15479', '67360cf332bd40ec0345237a')
        .then(console.log) //undefined
        .catch(console.error)
    } catch (error) {
      console.error(error)
    }
  })
  .catch(console.error)
  .finally(() => db.disconnect())
