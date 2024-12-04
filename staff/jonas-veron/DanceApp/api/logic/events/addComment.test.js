import "dotenv/config"
import db from "dat"
import addComment from "./addComment.js"

db.connect(process.env.MONGO_URL_TEST)
  .then(() => {
    try {
      return addComment(
        "675081ecff10b0f9b63de1cc",
        "6750820eff10b0f9b63de1d4",
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
