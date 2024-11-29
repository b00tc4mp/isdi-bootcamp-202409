import db from 'dat'
import deletePost from './deletePost.js';

db.connect('mongodb://127.0.0.1:27017/unsocial')
    .then(() => {
        try {
            return deletePost("673504d23131d3523c5172ec", "67350c9ae0e6e722266271fb")

        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())
