import db from 'dat'
import createPost from './createPost.js'


db.connect('mongodb://127.0.0.1:27017/unsocial-test')
  .then(() => {
    try {
      return createPost('672e23e5344b26bc5b0f870f', 'https://los40.com/resizer/v2/YCH3KATTSRNYVPAZBX5OJENOE4.jpg?auth=55fbda9c1c71287e3b974000905762a05643553a00c767e6cce092a8ec6f64a4&quality=70&width=1200&height=544&focal=632,262', 'Miau')
        .then(console.log)
        .catch(console.error)
    } catch (error) {
      console.error(error)
    }
  })
  .catch(console.error)
  .finally(() => db.disconnect())