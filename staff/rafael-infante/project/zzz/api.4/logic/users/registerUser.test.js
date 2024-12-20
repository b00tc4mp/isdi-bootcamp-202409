import 'dotenv/config'
import db from 'dat'

import registerUser from './registerUser.js'

await db.connect(process.env.MONGO_URL_TEST)

try {
  const result = await registerUser('Super Man', 'super@man.com', '123123123', '123123123', '+34605828090')
  console.log(result)
} catch (error) {
  console.error(error)
} finally {
  await db.disconnect()
}

// db.connect(process.env.MONGO_URL_TEST)
//   .then(() => {
//     try {
//       return registerUser('Rive Lino', 'rive@lino.com', '123123123', '123123123').then(console.log).catch(console.error)
//     } catch (error) {
//       console.error()
//     }
//   })
//   .catch(console.error)
//   .finally(() => db.disconnect())
