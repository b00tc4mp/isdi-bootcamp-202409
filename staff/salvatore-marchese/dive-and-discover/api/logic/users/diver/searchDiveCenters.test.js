import 'dotenv/config'
import db from 'dat'
import  searchDiveCenters from './searchDiveCenters.js'

await db.connect(process.env.MONGO_URL_TEST)

try {
    const diveCenters = await searchDiveCenters('678a6889b72fae53da53a994', 'Barcelona')

    console.log(diveCenters)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}