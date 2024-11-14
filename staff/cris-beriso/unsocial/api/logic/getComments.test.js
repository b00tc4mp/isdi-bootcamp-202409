import 'dotenv/config'
import db from 'dat'
import getComments from './getComments.js'

db.connect(process.env.MONGO_URL)
  .then(() => {
    try {
      return getComments('6734ce1c818dbb1cce23d08e', '6734d89a5e890c0e2b02a90a')
        .then(console.log)
        .catch(console.error)
    } catch (error) {
      console.error(error)
    }
  })
  .catch(console.error)
  .finally(() => db.disconnect())
