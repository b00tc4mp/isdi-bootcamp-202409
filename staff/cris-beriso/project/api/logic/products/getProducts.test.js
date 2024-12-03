import 'dotenv/config'
import db from 'dat'
import getProducts from './getProducts.js'

db.connect(process.env.MONGO_URL_TEST)
  .then(() => {
    try {
      return getProducts('674f39382d0d74ab61a1ec13')
        .then(products => console.log(products.map(({ id, name, image, description, likes, dislikes }) => ({ id, name, image, description, likes, dislikes }))))
        .catch(console.error)
    } catch (error) {
      console.error(error)
    }
  })
  .catch(console.error)
  .finally(() => db.disconnect())