import 'dotenv/config'
import db from 'dat'
import removeComment from './removeComment.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            //userId, postId, commentId
            return removeComment('672e2707de7dde80ec9233c6', '673221cc1c6692a6c62c2c0e', '6732361e0503e609b0a83309')
                .then(console.log) //undefined
                .catch(console.log)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    //Despues de ejecutar una consulta deberíamos cerrar la conexión para optimizar recursos
    .finally(() => db.disconnect())