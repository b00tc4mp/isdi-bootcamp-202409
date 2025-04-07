import 'dotenv/config'
import db from 'dat'
import createPost from './createPost.js'


db.connect(process.env.MONGO_URL)
  .then(() => {
    try {
      return createPost('6734ce44dfcd991dd513e654', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR30KLozTwK_j-Gp4oU7vaomlxKWFVrs3-9Gw&s', 'I love this sport')
        .then(console.log)
        .catch(console.error)
    } catch (error) {
      console.error(error)
    }
  })
  .catch(console.error)
  .finally(() => db.disconnect())