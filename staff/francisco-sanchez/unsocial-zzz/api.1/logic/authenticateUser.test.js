import db from 'dat'
import authenticateUser from './authenticateUser.js'

db.connect('mongodb://127.0.0.1:27017/unsocial-test')
    .then(() => {
        try {
            return authenticateUser('risto', 'risto')
                .then(console.log)
                .catch(console.error)

        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)

    //Despues de ejecutar una consulta deberíamos cerrar la conexión para optimizar recursos
    .finally(() => db.disconnect())