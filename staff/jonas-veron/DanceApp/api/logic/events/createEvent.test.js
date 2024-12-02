import "dotenv/config"
import db from "dat"
import createEvent from "./createEvent.js"

await db.connect(process.env.MONGO_URL_TEST)

try {
  const event = await createEvent(
    "674e073982ce3a76ab5c9e46",
    "https://www.salsero.es/images/events/2024-10-30-09-42-29_67229a35011f7.jpg",
    "Los esperamos !!!",
    "2024-12-07",
    {
      address: "Barcelona",
      coordinates: [41.3870154, 2.1700471],
    }
  )
  console.log(event)
} catch (error) {
  console.error(error)
} finally {
  await db.disconnect()
}
