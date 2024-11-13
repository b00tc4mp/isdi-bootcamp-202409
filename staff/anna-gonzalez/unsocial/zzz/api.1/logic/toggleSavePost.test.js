import db from 'dat'
import toggleSavePost from './toggleSavePost.js'

db.connect('mongodb://localhost/unsocial-test')
    .then(() => {
        try {
            return toggleSavePost('672e1ed8d36186d1eaf683b1', '672e3b61896ebf3fbb5fb827')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())