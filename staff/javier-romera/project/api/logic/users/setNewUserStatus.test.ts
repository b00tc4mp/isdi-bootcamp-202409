import 'dotenv/config'
import db from 'dat'

import setNewUserStatus from './setNewUserStatus.js'

await db.connect(process.env.ALLPIECE_URL_TEST!)

try {
    const result: void = await setNewUserStatus('67506750873625a867b428b9', 1, 'onepiecedle')

    console.log(result)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}