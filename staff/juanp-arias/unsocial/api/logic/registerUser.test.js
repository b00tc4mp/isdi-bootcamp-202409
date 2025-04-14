import 'dotenv/config'
import db from 'dat'
import registerUser from './registerUser.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            registerUser('Juan Pablo', 'juan@pablo.com', 'juanpablo', '123456', '123456')
                .then(() => console.log('user registered'))
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
