import db from 'dat'
import removeComment from './removeComment.js'

db.connect('mongodb://127.0.0.1:27017/unsocial-test')
  .then(() => {
    try {
      removeComment('672e264adba2254072ee1db4', '672f774b70016b0603d2a777', '672f7919ffb9918eb38f6f92')
        .then(console.log)
        .catch(console.error)
    } catch (error) {
      console.error(error)
    }
  })
  .catch(console.error)
