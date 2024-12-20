import 'dotenv/config'
import db from 'dat'
import getAds from './getAds.js'

await db.connect(process.env.MONGO_URL_TEST)

try {
  const result = await getAds('67520001d1bbbf4d3aca2f83')
  console.log(result)
} catch (error) {
  console.error(error)
} finally {
  await db.disconnect()
}
