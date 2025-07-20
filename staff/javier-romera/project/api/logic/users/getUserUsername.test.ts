import 'dotenv/config'
import db from 'dat'

import getUserName from './getUserUsername.js'

await db.connect(process.env.ALLPIECE_URL_TEST!)

try {
    const name: string = await getUserName('672e08451dfe72076c0ca52c', '672e08451dfe72076c0ca52c')

    console.log(name)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}