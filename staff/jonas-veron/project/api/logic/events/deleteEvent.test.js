import "dotenv/config"
import db from "dat"
import deleteEvent from "./deleteEvent.js"

db.connect(process.env.MONGO_URL_TEST)
  .then(() => {
    try {
      return deleteEvent("674b29ece6ee295a3207fd91", "674b2a28782a8a8f9f430234")
        .then(console.log)
        .catch(console.error)
    } catch (error) {
      console.error(error)
    }
  })
  .catch(console.error)
  .finally(() => db.disconnect())
