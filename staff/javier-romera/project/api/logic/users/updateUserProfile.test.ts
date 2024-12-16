import 'dotenv/config'
import db from 'dat'

import updateUserProfile from './updateUserProfile.js'

await db.connect(process.env.ALLPIECE_URL_TEST!)

try {
    await updateUserProfile('676012445968ca75df096f54', undefined, 'javi@gmail.com', '', '', '')
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}