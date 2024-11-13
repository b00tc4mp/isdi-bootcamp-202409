import db from 'dat'
import deletePost from './deletePost.js'

db.connect('mongodb://127.0.0.1:27017/unsocial-test')
  .then(() => {
    try {
      return deletePost('6734ce44dfcd991dd513e654', '6734d8e1f940e2c9b22d4eeb')
        .then(console.log)
        .catch(console.error)
    } catch (error) {
      console.error(error)
    }
  })
  .catch(console.error)
  .finally(() => db.disconnect())
