import 'dotenv/config'
import db from 'dat'

import getAdquiredPacks from './getAdquiredPacks.js'
await db.connect(process.env.MONGO_URL)

try {
    const result = await getAdquiredPacks('67640e5e2568e5139854dd58')
} catch (error) {
    console.error(error)

} finally {
    await db.disconnect()
}