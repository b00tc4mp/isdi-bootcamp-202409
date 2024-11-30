import "dotenv/config"
import db from "dat"
import createEvent from "./createEvent.js"

await db.connect(process.env.MONGO_URL_TEST)

try {
  const event = await createEvent(
    "674b4fe580d796be8674b37e",
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
