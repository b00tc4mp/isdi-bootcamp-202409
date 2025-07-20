import 'dotenv/config'
import db from 'dat'
import toggleLikeProduct from './toggleLikeProduct.js'

db.connect(process.env.MONGO_URL_TEST)
  .then(() => {
    try {
      return toggleLikeProduct('6751868bab8f3e047ae95518', '6751868cab8f3e047ae9554b')
        .then(console.log)
        .catch(console.error)
    } catch (error) {
      console.error(error)
    }
  })
  .catch(console.error)
  .finally(() => db.disconnect())