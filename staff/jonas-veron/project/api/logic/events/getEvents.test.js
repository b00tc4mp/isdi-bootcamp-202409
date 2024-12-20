import "dotenv/config"
import db from "dat"
import getEvents from "./getEvents.js"

db.connect(process.env.MONGO_URL_TEST)
  .then(() => {
    try {
      return getEvents("675ae4af6dca5dbcf1d4f50e")
        .then((events) => console.log(events))
        .catch(console.error)
    } catch (error) {
      console.error(error)
    }
  })
  .catch(console.error)
  .finally(() => db.disconnect())
