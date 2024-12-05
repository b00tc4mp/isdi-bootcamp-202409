import "dotenv/config"
import db from "dat"
import removeComment from "./removeComment.js"

db.connect(process.env.MONGO_URL_TEST)
  .then(() => {
    try {
      return removeComment(
        "67516e7174adc260fc0ba24a",
        "67516e8b74adc260fc0ba252",
        "67516ecc4998866571b89477"
      )
        .then(console.log)
        .catch(console.error)
    } catch (error) {
      console.error(error)
    }
  })
  .catch(console.error)
  .finally(() => db.disconnect())
