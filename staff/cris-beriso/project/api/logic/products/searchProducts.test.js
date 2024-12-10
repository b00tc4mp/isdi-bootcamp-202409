import 'dotenv/config'
import searchProducts from './searchProducts.js'
import db from 'dat'

db.connect(process.env.MONGO_URL_TEST)
  .then(() => {
    try {
      return searchProducts('67580aca5b4f252838815bfc', 'Rostro', 'polvo')
        .then(console.log)
        .catch(console.error)
    } catch (error) {
      console.error(error)
    }
  })
  .catch(console.error)
  .finally(() => db.disconnect())