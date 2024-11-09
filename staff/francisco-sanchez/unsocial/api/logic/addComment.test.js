import db from 'dat'
import addComment from './addComment.js'

db.connect('mongodb://127.0.0.1:27017/unsocial-test')
    .then(() => {
        try {
            //userId, postId, text
            addComment('672e2707de7dde80ec9233c6', '672f7aef4ee4e332926502a9', 'Texto del comentario chachi guai!')
                .then(() => console.log('Comment added successfully!'))
                .catch(console.error)

        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)