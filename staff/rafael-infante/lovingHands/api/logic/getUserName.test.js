import 'dotenv/config'
import db from 'dat'
import getUserName from './getUserName.js'

await db.connect(process.env.MONGO_URL_TEST)

try {
  const name = await getUserName('67489687e4bbcccf9795fdd9', '67489687e4bbcccf9795fdd9')
  console.log(name)
} catch (error) {
  console.error(error)
} finally {
  await db.disconnect()
}
