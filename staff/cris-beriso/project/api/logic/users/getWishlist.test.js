import 'dotenv/config'
import db from 'dat'
import getWishlist from './getWishlist.js'

db.connect(process.env.MONGO_URL_TEST)
  .then(() => {
    try {
      return getWishlist('675318a0a365dfdf1d4e4751')
        .then(wishlist => console.log(wishlist.map(({ name, image, description, likes, dislikes, comments }) => ({ name, image, description, likes, dislikes, comments }))))
        .catch(console.error)
    } catch (error) {
      console.error(error)
    }
  })
  .catch(console.error)
  .finally(() => db.disconnect())