import "dotenv/config"
import db from "dat"

import changePassword from "./changePassword.js"

await db.connect(process.env.MONGO_URL_TEST)

try {
  const result = await changePassword(
    "67605737f45b78a83d77f9eb",
    "456456456",
    "123123123",
    "123123123"
  )
  console.log(result)
} catch (error) {
  console.error(error)
} finally {
  await db.disconnect()
}
