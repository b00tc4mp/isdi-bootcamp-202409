import 'dotenv/config'
import db from 'dat'

import changeEmail from './changeEmail.js'

await db.connect(process.env.MONGO_URL_TEST)

try {
  const result = await changeEmail('6759b077a2a65d1cb279b9d3', 'rico@fede.com', 'rico@fe.com', 'rico@fe.com')
  console.log('email changed')
} catch (error) {
  console.error(error)
} finally {
  await db.disconnect()
}
