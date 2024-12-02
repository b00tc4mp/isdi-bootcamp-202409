import 'dotenv/config'
import db from 'dat'

import getAllCharactersNameAndAlias from './getAllCharactersNameAndAlias.js'

await db.connect(process.env.ALLPIECE_URL_TEST!)

try {
    const characters = await getAllCharactersNameAndAlias('674d9c2b603a218804b7f8cb')

    console.log(characters!.length)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}