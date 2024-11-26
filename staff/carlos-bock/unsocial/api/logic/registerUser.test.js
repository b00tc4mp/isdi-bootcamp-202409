import 'dotenv/config.js'
import db from 'dat';

import registerUser from './registerUser.js';

await db.connect(process.env.MONGO_URL_TEST)//'mongodb://127.0.0.1:27017/unsocial-test'

try {
    const result = await registerUser('Coco Drilo', 'coco@drilo.com', 'cocodrilo', '123123123', '123123123')
    console.log(result) // undefined
} catch (error) {
    console.log(error)
} finally {
    await db.disconnect()
}