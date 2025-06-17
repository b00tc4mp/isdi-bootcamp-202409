import 'dotenv/config'
import db from 'dat'
import  searchDiveCenters from './searchDiveCenters.js'

await db.connect(process.env.MONGO_URL_TEST)

try {
    const diveCenters = await searchDiveCenters('679cbba23dd31313f6ab5fc8', 'Barcelona')

    console.log(diveCenters)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}