import db from 'dat'
import removeComment from './removeComment.js'

db.connect('mongodb://localhost/unsocial-test')
  .then(() => {
    try {
      return removeComment('672e264adba2254072ee1db4', '67322cd9d8208c90cf28c095', '67337bb0d2a5df321b28472b')
        .then(console.log) //undefined
        .catch(console.error)
    } catch (error) {
      console.error(error)
    }
  })
  .catch(console.error)
  .finally(() => db.disconnect())
