import db from 'dat'
import createPost from './createPost.js'

db.connect('mongodb://127.0.0.1:27017/unsocial-test')
    .then(() => {
        try {
            return createPost('67320fbf808fb47ab40d8190', 'https://ih1.redbubble.net/image.201921056.2236/raf,360x360,075,t,fafafa:ca443f4786.u1.jpg', 'P. Sawyer')
                .then(console.log) // undefined
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())