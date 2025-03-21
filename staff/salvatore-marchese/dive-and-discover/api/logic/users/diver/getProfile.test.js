import 'dotenv/config'
import db from 'dat'
import getProfile from './getProfile.js';

await db.connect(process.env.MONGO_URL_TEST)

try {
    const userProfile = await getProfile('67a09e443cf791ec88c3422d', '67a09e443cf791ec88c3422d')

    console.log(userProfile)
} catch (error) {
    console.error('Unexpected test runner error:', error);
} finally {
    await db.disconnect();
    console.log('Disconnected from test database.');
}