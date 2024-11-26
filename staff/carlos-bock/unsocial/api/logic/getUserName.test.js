import 'dotenv/config';
import db from 'data';
import getUserName from './getUserName.js';

await db.connect(process.env.MONGO_URL_TEST)//'mongodb://localhost:27017/unsocial-test'

try {
    const name = getUserName('672e3fc39cee3ea8fbf6dc72', '672e3fc39cee3ea8fbf6dc72') // reemplazar ids

    console.log(name)
} catch (error) {
    console.error(error);
} finally {
    await db.disconnect()
}

