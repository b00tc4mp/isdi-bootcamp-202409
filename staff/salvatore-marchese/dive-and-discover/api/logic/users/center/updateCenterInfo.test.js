import 'dotenv/config'
import db, { User } from 'dat'
import updateCenterInfo from './updateCenterInfo.js'

await db.connect(process.env.MONGO_URL_TEST)

const data = {
    name: 'Tossa Super Diver',
    email: 'tossasuperdiver@test.com',
    telephone: '9726543210'
}

try {
    await updateCenterInfo('67a0d91749b467ed7de5933b', '67a0d91749b467ed7de5933b', data)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}
