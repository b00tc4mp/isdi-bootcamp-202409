import 'dotenv/config'
import db from 'dat'
import getUserStage from './getUserStage.js'

await db.connect(process.env.MONGO_URL_TEST)

try {
    const stage = await getUserStage('6755e0278b1c668012bbdba6')

    console.log(stage)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}