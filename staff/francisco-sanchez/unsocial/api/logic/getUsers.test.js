import 'dotenv/config'
import db from 'dat'
import getUsers from './getUsers.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {

        try {
            return getUsers() //userId //asumimos que vamos a necesitar el userId
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    //Despues de ejecutar una consulta deberíamos cerrar la conexión para optimizar recursos
    .finally(() => db.disconnect())