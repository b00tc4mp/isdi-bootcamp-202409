import 'dotenv/config'
import db from 'dat'
import getStorePrices from './getStorePrices.js'

db.connect(process.env.MONGO_URL_TEST)
  .then(() => {
    try {
      return getStorePrices('675b1792fecb1169d57f5bee', '675b1792fecb1169d57f5c5d')
        .then(console.log)
        .catch(console.error)
    } catch (error) {
      console.error(error)
    }
  })
  .catch(console.error)
  .finally(() => db.disconnect())