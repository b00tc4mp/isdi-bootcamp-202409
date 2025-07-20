import 'dotenv/config'
import db from 'dat'
import getWishlist from './getWishlist.js'

db.connect(process.env.MONGO_URL_TEST)
  .then(() => {
    try {
      return getWishlist('67545b9183cabedba9905786')
        .then(wishlist => console.log(wishlist.map(({ id, name, image, likes, dislikes }) => ({ id, name, image, likes, dislikes }))))
        .catch(console.error)
    } catch (error) {
      console.error(error)
    }
  })
  .catch(console.error)
  .finally(() => db.disconnect())