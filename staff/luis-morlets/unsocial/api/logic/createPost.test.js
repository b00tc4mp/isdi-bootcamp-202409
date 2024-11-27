import 'dotenv/config'
import db from 'dat'
import createPost from './createPost.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return createPost('672e2c487f1acbd7a5009c67', 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Sim%C3%B3n_Bol%C3%ADvar_by_Acevedo_Bernal%2C_1922.jpg', 'Libertando')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())