import db from 'dat'
import addComment from './addComment.js'

db.connect('mongodb://localhost/unsocial-test')
    .then(() => {
        try {
            return addComment('6734bc401af0ac4373132714', '6734bc7e98af1ab3ac3cc2f9', 'hola patagonia')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())