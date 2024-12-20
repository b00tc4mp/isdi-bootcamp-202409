import "dotenv/config"
import db from "dat"

import changeProfilePicture from "./changeProfilePicture.js"

await db.connect(process.env.MONGO_URL_TEST)

try {
  const result = await changeProfilePicture("67608bf38e915e053ebacb15", [
    "https://plus.unsplash.com/premium_photo-1689977968861-9c91dbb16049?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Zm90byUyMGRlJTIwcGVyZmlsfGVufDB8fDB8fHww",
  ])
  console.log(result)
} catch (error) {
  console.error(error)
} finally {
  await db.disconnect()
}
