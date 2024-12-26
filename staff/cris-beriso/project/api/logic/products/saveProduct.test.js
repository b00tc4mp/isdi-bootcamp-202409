import 'dotenv/config'
import db from 'dat'
import saveProduct from './saveProduct.js'

db.connect(process.env.MONGO_URL_TEST)
  .then(() => {
    try {
      return saveProduct('6752de784b7e1a2a93d08149', '6752de794b7e1a2a93d08179')
        .then(console.log)
        .catch(console.error)
    } catch (error) {
      console.error(error)
    }
  })
  .catch(console.error)
  .finally(() => db.disconnect())