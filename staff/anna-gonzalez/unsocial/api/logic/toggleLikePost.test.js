import db from 'dat'
import toggleLikePost from './toggleLikePost.js'

db.connect('mongodb://127.0.0.1:27017/unsocial-test')
    .then(() => {
        try {
            toggleLikePost('672e1ed8d36186d1eaf683b1', '672e33294049f022635a1d6d')
                .then(() => console.log('Like added or taken'))
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })