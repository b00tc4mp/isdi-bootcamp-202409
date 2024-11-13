import db from 'dat'
import addComment from './addComment.js'

db.connect('mongodb://127.0.0.1:27017/unsocial-test')
    .then(() => {
        try {
            //userId, postId, text
            return addComment('672e2707de7dde80ec9233c6', '673221cc1c6692a6c62c2c0e', 'Texto  3 del comentario chachi guai!')
                .then(() => console.log('Comment added successfully!'))
                .catch(console.error)

        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    //Despues de ejecutar una consulta deberíamos cerrar la conexión para optimizar recursos
    .finally(() => db.disconnect())