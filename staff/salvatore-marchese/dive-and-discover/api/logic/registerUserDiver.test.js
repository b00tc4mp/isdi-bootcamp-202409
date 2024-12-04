import 'dotenv/config'
import db from 'dat'
import registerUserDiver from './registerUserDiver.js'

await db.connect(process.env.MONGO_URL_TEST)


try {
    const user = await registerUserDiver('nemo', 'nemo@gmail.com', '123123123', '123123123')

    console.log(user)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}