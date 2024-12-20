import "dotenv/config"
import db from "dat"

import changeEmail from "./changeEmail.js"

await db.connect(process.env.MONGO_URL_TEST)

try {
  const user = await changeEmail(
    "675c497d86e963451007a426",
    "jonas.veron@hotmail.com",
    "jonasito@dancer.com"
  )
  console.log(user)
} catch (error) {
  console.error(error)
} finally {
  await db.disconnect()
}
