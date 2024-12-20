import "dotenv/config"
import db from "dat"

import registerUser from "./registerUser.js"

await db.connect(process.env.MONGO_URL_TEST)

try {
  const user = await registerUser(
    "Juan Diego",
    "juan@diego.com",
    "123123123",
    "123123123"
  )
  console.log("User registered")
} catch (error) {
  console.error(error)
} finally {
  await db.disconnect()
}
