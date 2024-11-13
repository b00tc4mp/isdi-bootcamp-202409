import db from 'dat'
import addComment from './addComment.js'

db.connect('mongodb://127.0.0.1:27017/unsocial-test')
  .then(() => {
    try {
      return addComment('6734ce1c818dbb1cce23d08e', '6734d89a5e890c0e2b02a90a', '(L)')
        .then(console.log)
        .catch(console.error)
    } catch (error) {
      console.error(error)
    }
  })
  .catch(console.error)
  .finally(() => db.disconnect())