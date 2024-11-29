import "dotenv/config"
import db from "dat"
import getUserName from "./getUserName.js"

await db.connect(process.env.MONGO_URL_TEST)

try {
  const name = await getUserName(
    "6748bd36ee3300b7b093c8ed",
    "6748bd36ee3300b7b093c8ed"
  )

  console.log(name)
} catch (error) {
  console.error(error)
} finally {
  await db.disconnect()
}
