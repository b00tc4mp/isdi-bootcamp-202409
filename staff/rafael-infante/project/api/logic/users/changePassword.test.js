import 'dotenv/config'
import db from 'dat'

import changePassword from './changePassword.js'

await db.connect(process.env.MONGO_URL_TEST)

try {
  const result = await changePassword('6759b077a2a65d1cb279b9d3', '321321321', '111222333', '111222333')
  console.log('password changed')
} catch (error) {
  console.error(error)
} finally {
  await db.disconnect()
}
