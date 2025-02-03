import 'dotenv/config'
import db from 'dat'
import getUserName from './getUserName.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return getUserName('672e20b1bd3432d3ba964530', '672e233ebd3432d3ba964533')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    //Despues de ejecutar una consulta deberíamos cerrar la conexión para optimizar recursos
    .finally(() => db.disconnect())

/*try {
    console.log(getUserName('m2vvw4xzn6d'))
} catch (error) {
    console.error(error)
}*/