import db from 'dat'
import addComment from './addComment.js'

db.connect('mongodb://127.0.0.1:27017/unsocial-test')

.then(() =>{
    try {
        addComment('6730da23d8c89f7e9ff9bdbc', '67310c40af55c8c5843a324a', 'wow!')
        .then(() => console.log('Comment added successfully'))
        .catch(console.error);
    } catch (error) {
        console.error(error)
    }
})
.catch (console.error)