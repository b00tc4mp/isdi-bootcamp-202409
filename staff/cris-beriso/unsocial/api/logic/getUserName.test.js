import db from 'dat'
import getUserName from './getUserName.js'

db.connect('mongodb://127.0.0.1:27017/unsocial-test')
  .then(() => {
    try {
      return getUserName('6734d43df940e2c9b22d4ee9', '6734ce44dfcd991dd513e654')
        .then(console.log)
        .catch(console.error)
    } catch (error) {
      console.error(error)
    }
  })
  .catch(console.error)
  .finally(() => db.disconnect())

