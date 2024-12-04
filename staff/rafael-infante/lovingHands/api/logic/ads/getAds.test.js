import 'dotenv/config'
import db from 'dat'
import getAds from './getAds.js'

await db.connect(process.env.MONGO_URL_TEST)

try {
  const result = await getAds('67504fa1fa7ac0276ab8b05b')
  console.log(result)
} catch (error) {
  console.error(error)
} finally {
  await db.disconnect()
}
