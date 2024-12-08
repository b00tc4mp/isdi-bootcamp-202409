import 'dotenv/config'
import db from 'dat'
import getProductDetails from './getProductDetails.js'

db.connect(process.env.MONGO_URL_TEST)
  .then(() => {
    try {
      return getProductDetails('67545b9183cabedba9905786', '67545b9183cabedba990578e')
        .then(console.log)
        .catch(console.error)
    } catch (error) {
      console.error(error)
    }
  })
  .catch(console.error)
  .finally(() => db.disconnect())