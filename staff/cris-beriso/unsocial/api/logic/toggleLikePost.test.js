import db from 'dat'
import toggleLikePost from './toggleLikePost.js'

db.connect('mongodb://127.0.0.1:27017/unsocial-test')
  .then(() => {
    try {
      toggleLikePost('672e234f9baf06973d87d0ad', '6730dcf6f1c5e699fd2f603f')
    } catch (error) {
      console.error(error)
    }
  })
  .catch(console.error)

