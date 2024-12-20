import "dotenv/config"
import db from "dat"
import toggleLikeEvent from "./toggleLikeEvent.js"

db.connect(process.env.MONGO_URL_TEST)
  .then(() => {
    try {
      return toggleLikeEvent(
        "674f5c3a4db9dce9cca8a42d",
        "674f61644e7a89b65047b107"
      )
        .then(console.log)
        .catch(console.error)
    } catch (error) {
      console.error(error)
    }
  })
  .catch(console.error)
  .finally(() => db.disconnect())
