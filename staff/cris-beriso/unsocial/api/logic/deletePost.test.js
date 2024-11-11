import db from 'dat'
import deletePost from './deletePost.js'

db.connect('mongodb://127.0.0.1:27017/unsocial-test')
  .then(() => {
    try {
      return deletePost('672e264adba2254072ee1db4', '672f6570f4dd82f81604c350')
        .then(console.log)
        .catch(console.error)
    } catch (error) {
      console.error(error)
    }
  })
  .catch(console.error)
  .finally(() => db.disconnect())
