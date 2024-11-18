//import getUserName from './getUserName.js'
import db from 'dat'
import deletePost from "./deletePost.js"

db.connect('mongodb://127.0.0.1:27017/unsocial-test')
    .then(() => {
        console.log('database connected')

        try {
            //En principio aquí no haría falta ningún console log 
            /**
             * userId / postId
             */
            return deletePost('672e2707de7dde80ec9233c6', "6731d0f7284742ae64625ea1")
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error('Error in test: ', error)
        }
    })
    .catch(console.error)
    //Despues de ejecutar una consulta deberíamos cerrar la conexión para optimizar recursos
    .finally(() => db.disconnect())