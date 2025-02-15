import 'dotenv/config';
import db from 'dat';
import getUserCenter from './getUserCenter.js';

await db.connect(process.env.MONGO_URL_TEST);

try {
    const userCenter = await getUserCenter('67a0f721f4b41ee9414c7ba4', '67a0f721f4b41ee9414c7ba4')

    console.log(userCenter)
} catch (error) {
    console.error('unexpected error:', error)
} finally {
    await db.disconnect()
    console.log('Disconnected from test database')
}
