import 'dotenv/config'
import db from 'dat'

import registerPlayer from './registerPlayer.js'

await db.connect(process.env.MONGO_URL_TEST!)

try {
    const result = await registerPlayer('Mani Vela', 'mani@vela.com', 'manivela', '123123123', '123123123')
    console.log(result)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}