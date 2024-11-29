import "dotenv/config"
import db from "dat"
import getUserFullName from "./getUserFullName.js"

await db.connect(process.env.MONGO_URL_TEST)

try {
  const fullName = await getUserFullName(
    "6748bd36ee3300b7b093c8ed",
    "6748bd36ee3300b7b093c8ed"
  )

  console.log(fullName)
} catch (error) {
  console.error(error)
} finally {
  await db.disconnect()
}
