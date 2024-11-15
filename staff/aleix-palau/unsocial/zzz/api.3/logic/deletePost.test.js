import db from 'dat'
import deletePost from './deletePost.js'

db.connect(process.env.MONGO_URL)
    .then(() => {
        try {
            return deletePost('67320fbf808fb47ab40d8190', '67322d6932b8b9512be69678')
                .then(console.log) // undefined
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())