import "dotenv/config"
import db from "dat"

import authenticateUser from "./authenticateUser.js"

await db.connect(process.env.MONGO_URL_TEST)

try {
  const user = await authenticateUser("juan@diego.com", "123123123")
  console.log(user)
} catch (error) {
  console.error(error)
} finally {
  await db.disconnect()
}
