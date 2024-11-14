import db from 'dat'
import createPost from './createPost.js'

db.connect('mongodb://127.0.0.1:27017/unsocial-test')
    .then(() => {
        try {
            return createPost('67320fbf808fb47ab40d8190', 'https://i.pinimg.com/236x/98/63/2e/98632eb2f8fa2b97a53068c9d6853e5f.jpg', 'first of all...')
                .then(console.log) // undefined
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())