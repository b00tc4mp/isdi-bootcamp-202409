import 'dotenv/config'
import db from 'dat'
import registerPet from './registerPet.js'


db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return registerPet('67505536c7e94a4c720a693c', '123456789012345', 'Peke', 'Meztizo', true, 35, true, '2023/10/21')
                .then(console.log) // undefined
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())