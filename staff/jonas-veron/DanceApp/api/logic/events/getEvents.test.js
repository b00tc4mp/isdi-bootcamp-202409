import "dotenv/config"
import db from "dat"
import getEvents from "./getEvents.js"

db.connect(process.env.MONGO_URL_TEST)
  .then(() => {
    try {
      return getEvents("6755846afcda6b25745ccdb1")
        .then((events) => console.log(events))
        .catch(console.error)
    } catch (error) {
      console.error(error)
    }
  })
  .catch(console.error)
  .finally(() => db.disconnect())
