/* import 'dotenv/config'
import db from 'dat'
import authenticateUser from './authenticateUser.js'

db.connect(process.env.MONGO_URL_TEST)
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
    .finally(() => db.disconnect()) */



import 'dotenv/config'
import db from 'dat'
import authenticateUser from './authenticateUser.js'

await db.connect(process.env.MONGO_URL_TEST)

try {
    const user = await authenticateUser('cocodrilo', '123123123')

    console.log(user)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}