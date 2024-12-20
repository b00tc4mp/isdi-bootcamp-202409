import "dotenv/config"
import db from "dat"
import toggleFavoriteEvent from "./toggleFavoriteEvent.js"

db.connect(process.env.MONGO_URL_TEST)
  .then(() => {
    try {
      return toggleFavoriteEvent(
        "6751905974adc260fc0ba2d9",
        "6751da5c2e2df36606cff0f5"
      )
        .then(console.log)
        .catch(console.error)
    } catch (error) {
      console.error(error)
    }
  })
  .catch(console.error)
  .finally(() => db.disconnect())
