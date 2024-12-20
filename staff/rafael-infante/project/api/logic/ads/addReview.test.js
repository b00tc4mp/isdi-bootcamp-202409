import 'dotenv/config'
import db from 'dat'
import addReview from './addReview.js'

db.connect(process.env.MONGO_URL_TEST)
  .then(() => {
    try {
      return addReview(
        '6751a66986d104205345430a',
        '6751a66986d104205345430c',
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
