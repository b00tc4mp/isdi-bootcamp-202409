import db from 'dat'
import toggleLikePost from './toggleLikePost.js'

db.connect('mongodb://localhost/unsocial-test')
    .then(() => {
        try {
            return toggleLikePost('6734bc401af0ac4373132714', '6734bc7e98af1ab3ac3cc2f9')
                .then(console.log) //undefined
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())