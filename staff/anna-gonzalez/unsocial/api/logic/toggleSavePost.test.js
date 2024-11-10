import db from 'dat'
import toggleSavePost from './toggleSavePost.js'

db.connect('mongodb://127.0.0.1:27017/unsocial-test')
    .then(() => {
        try {
            toggleSavePost('672e1ed8d36186d1eaf683b1', '672e3b61896ebf3fbb5fb827')
                .then(() => console.log('Saved/Unsaved'))
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })