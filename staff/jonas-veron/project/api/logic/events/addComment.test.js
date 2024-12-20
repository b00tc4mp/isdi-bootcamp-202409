import "dotenv/config"
import db from "dat"
import addComment from "./addComment.js"

db.connect(process.env.MONGO_URL_TEST)
  .then(() => {
    try {
      return addComment(
        "6751864074adc260fc0ba2be",
        "6751865074adc260fc0ba2c8",
        "HOLA COMENTARIO!"
      )
        .then(console.log)
        .catch(console.error)
    } catch (error) {
      console.error(error)
    }
  })
  .catch(console.error)
  .finally(() => db.disconnect())
