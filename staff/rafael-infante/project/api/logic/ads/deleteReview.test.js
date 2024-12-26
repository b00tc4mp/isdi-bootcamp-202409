import 'dotenv/config'
import db from 'dat'
import deleteReview from './deleteReview.js'

await db.connect(process.env.MONGO_URL_TEST)

try {
  await deleteReview('675196cf5420a876c8e3b0b5', '67519493ee7abce5710f74e4', '675194f04541dc755fd6c3f9')
  console.log('Review deleted')
} catch (error) {
  console.error(error)
} finally {
  await db.disconnect()
}
