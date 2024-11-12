import db from 'dat'
import getComments from './getComments.js'

db.connect('mongodb://localhost/unsocial-test')
  .then(() => {
    try {
      return getComments('672e234f9baf06973d87d0ad', '67322cd9d8208c90cf28c095')
        .then(console.log)
        .catch(console.error)
    } catch (error) {
      console.error(error)
    }
  })
  .catch(console.error)
  .finally(() => db.disconnect())
