import 'dotenv/config' 
import db from 'dat'
import registerUserCenter from './registerUserCenter.js'

await db.connect(process.env.MONGO_URL_TEST)

try {
    const user = await registerUserCenter('DiveCenterTest', 'divecenter@test.com', '123123123', '123123123', 'seawater street 1', 'Spain', 'Barcelona', '08001', 'center')

    console.log(user)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}