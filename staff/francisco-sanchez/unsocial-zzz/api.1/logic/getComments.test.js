import db from 'dat'

import getComments from './getComments.js'

db.connect('mongodb://127.0.0.1:27017/unsocial-test')
    .then(() => {
        try {
            //userId, postId
            return (getComments('672e2707de7dde80ec9233c6', '673221cc1c6692a6c62c2c0e'))
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    //Despues de ejecutar una consulta deberíamos cerrar la conexión para optimizar recursos
    .finally(() => db.disconnect())