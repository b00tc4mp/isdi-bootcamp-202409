import 'dotenv/config'
import searchProducts from './searchProducts.js'
import db from 'dat'

db.connect(process.env.MONGO_URL_TEST)
  .then(() => {
    try {
      return searchProducts('6756e063ba3b6f062cdb81c4', 'Rostro')
        .then(console.log)
        .catch(console.error)
    } catch (error) {
      console.error(error)
    }
  })
  .catch(console.error)
  .finally(() => db.disconnect())