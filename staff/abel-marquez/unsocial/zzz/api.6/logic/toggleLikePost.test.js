import db from 'dat'
import toggleLikePost from './toggleLikePost.js'


db.connect('mongodb://localhost/unsocial-test')
    .then(() => {
        try {
            return toggleLikePost('672e020b405e99414c72a710', '6731cf9fd43e158259538a4f')
                .then(console.log)
                .catch(console.log)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => disconnect())