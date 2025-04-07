import 'dotenv/config'
import db from 'dat'

import registerUser from './registerUser.js'

await db.connect(process.env.MONGO_URL_TEST)

try {
  const result = await registerUser('Ana', 'ana@ana.com', 'anamco', 'criscris', 'criscris')

  console.log(result)//undefined
} catch (error) {
  console.error(error)
} finally {
  await db.disconnect()
}
