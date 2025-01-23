import 'dotenv/config'
import db from 'dat'

import createBasePack from './createBasePack.js'

await db.connect(process.env.MONGO_URL)

const user = '675036c010473f3d809e5359'
const packName = '5h pack '
const description = 'esta es la descripción del test pack 5'
const quantity = 5
const unit = 'hours'
const expiringTime = 12 //means 12 month
const price = 444
const currency = 'EUR'


try {
    const result = await createBasePack(user,
        packName,
        description,
        quantity,
        unit,
        expiringTime,
        price,
        currency
    )
    console.log(result)

} catch (error) {
    console.error(error)

} finally {
    await db.disconnect()
}