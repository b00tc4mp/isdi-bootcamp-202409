import "dotenv/config"
import db from "dat"
import getEvents from "./getEvents.js"

db.connect(process.env.MONGO_URL_TEST)
  .then(() => {
    debugger
    try {
      return getEvents("674b4fe580d796be8674b37e")
        .then((events) => console.log(events))
        .catch(console.error)
    } catch (error) {
      console.error(error)
    }
  })
  .catch(console.error)
  .finally(() => db.disconnect())
