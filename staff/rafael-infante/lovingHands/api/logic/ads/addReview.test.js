import 'dotenv/config'
import db from 'dat'
import addReview from './addReview.js'

db.connect(process.env.MONGO_URL_TEST)
  .then(() => {
    try {
      return addReview(
        '675196cf5420a876c8e3b0b5',
        '67519493ee7abce5710f74e4',
        'no me gusto mucho el trato, no lo recomiendo',
        1
      )
        .then(console.log('review added'))
        .catch(console.error)
    } catch (error) {
      console.error(error)
    }
  })
  .catch(console.error)
  .finally(() => db.disconnect())
