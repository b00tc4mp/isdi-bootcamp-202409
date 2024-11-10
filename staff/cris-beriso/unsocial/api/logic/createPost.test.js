import db from 'dat'
import createPost from './createPost.js'


db.connect('mongodb://127.0.0.1:27017/unsocial-test')
  .then(() => {
    try {
      createPost('672e264adba2254072ee1db4', 'https://nsabers.es/cdn/shop/articles/rogue_0ne_photo_realistic_Star_Wars_darth_maul_black_cloak_inti_3026af25-54be-4505-8c2a-9615fdfd7b7a.png?v=1713855939', 'Darth Maul')
        .then(console.log)
        .catch(console.error)
    } catch (error) {
      console.error(error)
    }
  })
  .catch(console.error)
