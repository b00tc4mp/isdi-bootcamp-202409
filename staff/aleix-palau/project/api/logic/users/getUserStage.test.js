import 'dotenv/config'
import db from 'dat'
import getUserStage from './getUserStage.js'

await db.connect(process.env.MONGO_URL_TEST)

try {
    const stage = await getUserStage('6759d7b99ca9518ac5b9b3b5')

    console.log(stage)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}