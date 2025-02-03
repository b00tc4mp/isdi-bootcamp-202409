import 'dotenv/config'
import db from 'dat'
import toggleLikePost from "./toggleLikePost.js"

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            //userId / PostId
            return toggleLikePost('672e2707de7dde80ec9233c6', '673221cc1c6692a6c62c2c0e')
                //.then((result) => console.log(result.message))
                .then(console.log('liked/unliked')) //undefined
                .catch(console.error)

        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    //Despues de ejecutar una consulta deberíamos cerrar la conexión para optimizar recursos
    .finally(() => db.disconnect())