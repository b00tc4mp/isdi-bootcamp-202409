import "dotenv/config"
import db from "dat"
import getFavoriteEvents from "./getFavoriteEvents.js"

db.connect(process.env.MONGO_URL_TEST)
  .then(() => {
    try {
      return getFavoriteEvents("6751aa05a91619896583fdbf")
        .then((events) => console.log(events))
        .catch(console.error)
    } catch (error) {
      console.error(error)
    }
  })
  .catch(console.error)
  .finally(() => db.disconnect())
