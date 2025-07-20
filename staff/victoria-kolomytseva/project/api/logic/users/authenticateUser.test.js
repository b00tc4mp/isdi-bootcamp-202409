import 'dotenv/config'
import db from 'dat'
import authenticateUser from './authenticateUser.js'

await db.connect(process.env.MONGO_URL_TEST)

try {
    const user = await authenticateUser('juanperez', '123123123')

    console.log(user)
} catch (error) { //Si ocurre un error (como usuario inexistente o contraseña incorrecta), se captura en el bloque catch
    console.error(error)
} finally {
    await db.disconnect()

}

