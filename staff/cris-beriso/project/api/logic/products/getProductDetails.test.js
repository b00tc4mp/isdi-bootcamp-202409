import 'dotenv/config'
import db from 'dat'
import getProductDetails from './getProductDetails.js'

db.connect(process.env.MONGO_URL_TEST)
  .then(() => {
    try {
      return getProductDetails('6759b10244c7f0e87852abcc', '6759ae7b423ca8142b07356a')
        .then(console.log)
        .catch(console.error)
    } catch (error) {
      console.error(error)
    }
  })
  .catch(console.error)
  .finally(() => db.disconnect())