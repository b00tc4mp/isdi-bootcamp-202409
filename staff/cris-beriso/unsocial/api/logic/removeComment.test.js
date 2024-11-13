import db from 'dat'
import removeComment from './removeComment.js'

db.connect('mongodb://localhost/unsocial-test')
  .then(() => {
    try {
      return removeComment('6734ce1c818dbb1cce23d08e', '6734d89a5e890c0e2b02a90a', '6734dea1f940e2c9b22d4eed')
        .then(console.log) //undefined
        .catch(console.error)
    } catch (error) {
      console.error(error)
    }
  })
  .catch(console.error)
  .finally(() => db.disconnect())
