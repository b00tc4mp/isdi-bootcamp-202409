import db from 'dat'
import addComment from './addComment.js'

db.connect('mongodb://127.0.0.1:27017/unsocial-test')
  .then(() => {
    try {
      return addComment('672e264adba2254072ee1db4', '67322cd9d8208c90cf28c095', '(L)')
        .then(console.log)
        .catch(console.error)
    } catch (error) {
      console.error(error)
    }
  })
  .catch(console.error)
  .finally(() => db.disconnect())