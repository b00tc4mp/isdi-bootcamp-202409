import 'dotenv/config'
import db from 'dat'
import getUserName from './getUserName.js'

await db.connect(process.env.MONGO_URL_TEST)

try {
  const name = await getUserName('674da16c73c1190c6ecffe93', '674da16c73c1190c6ecffe93')

  console.log(name)
} catch (error) {
  console.error(error)
} finally {
  await db.disconnect()
}