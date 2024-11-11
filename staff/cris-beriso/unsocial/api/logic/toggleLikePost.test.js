import db from 'dat'
import toggleLikePost from './toggleLikePost.js'

db.connect('mongodb://localhost/unsocial-test')
  .then(() => {
    try {
      return toggleLikePost('672e23e5344b26bc5b0f870f', '67321b9c1caf2dc8f4e26353')
        .then(console.log)
        .catch(console.error)
    } catch (error) {
      console.error(error)
    }
  })
  .catch(console.error)
  .finally(() => db.disconnect())

