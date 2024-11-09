import db from 'dat'
import deletePost from './deletePost.js'

db.connect('mongodb://127.0.0.1:27017/unsocial-test')
    .then(() => {
        try {
            deletePost('672e1ed8d36186d1eaf683b1', '672e32659b7c91648e0c1d7b')
                .then(() => console.log('Post deleted'))
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)