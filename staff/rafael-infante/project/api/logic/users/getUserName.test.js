import 'dotenv/config'
import db from 'dat'
import getUserName from './getUserName.js'

await db.connect(process.env.MONGO_URL_TEST)

try {
  const name = await getUserName('674b3c13057b59218a6847b6', '674b3c13057b59218a6847b6')
  console.log(name)
} catch (error) {
  console.error(error)
} finally {
  await db.disconnect()
}
