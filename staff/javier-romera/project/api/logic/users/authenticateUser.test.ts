import 'dotenv/config'
import db from 'dat'

import authenticateUser from './authenticateUser.js'
import { Payload } from '../../types.js'

await db.connect(process.env.ALLPIECE_URL_TEST!)

try {
    const payload: Payload = await authenticateUser('javi', '123123123')

    console.log(payload)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}