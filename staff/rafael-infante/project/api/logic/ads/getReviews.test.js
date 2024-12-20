import 'dotenv/config'
import db from 'dat'
import getReviews from './getReviews.js'

await db.connect(process.env.MONGO_URL_TEST)

try {
  const result = await getReviews('6751a66986d104205345430a', '6751a66986d104205345430c')
  console.log(result)
} catch (error) {
  console.error(error)
} finally {
  await db.disconnect()
}
