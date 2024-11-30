import 'dotenv/config'
import db from 'dat';

import getUserName from './getUserName.js';

await db.connect(process.env.MONGO_URL_TEST!)

try {
    const name = await getUserName('672e08451dfe72076c0ca52c', '672e08451dfe72076c0ca52c')

    console.log(name)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}