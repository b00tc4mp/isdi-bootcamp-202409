import 'dotenv/config' 
import db from 'dat'
import registerUserCenter from './registerUserCenter.js'

await db.connect(process.env.MONGO_URL_TEST)

try {
    const user = await registerUserCenter('Tossa Super Diver', 'divertossa@test.com', '123123123', '123123123', 'Seafront street, 1', 'Spain', 'Tossa de Mar', '17320','6980558739', )

    console.log(user)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
} 