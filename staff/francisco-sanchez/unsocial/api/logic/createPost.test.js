import 'dotenv/config'
import db from 'dat'
import createPost from './createPost.js'


db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            //Si aquí no informamos el return no funciona el disconnect
            return createPost('672e2707de7dde80ec9233c6', 'https://images.squarespace-cdn.com/content/v1/6137f1eafdd46630c1744367/118c6bda-87ce-422c-95eb-1c8085e160f4/DSC00486-2.jpg', 'hola patagonia')
                .then(() => console.log('Post created successfully'))
                .catch(console.error)

        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)

    //Despues de ejecutar una consulta deberíamos cerrar la conexión para optimizar recursos
    .finally(() => db.disconnect())
