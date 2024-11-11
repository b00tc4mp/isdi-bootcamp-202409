import toggleLikePosts from './toggleLikePosts.js'
import db from 'dat'

db.connect('mongodb://127.0.0.1:27017/unsocial-test')
    .then(() => {
        try {
            return toggleLikePosts('672e1cf7fbf40da8a565ff5d', '673219faee3859e42948275f')
                .then(() => console.log('liked'))
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())