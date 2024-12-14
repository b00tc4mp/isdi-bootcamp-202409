import 'dotenv/config'
import db from 'dat'
import createPost from './createPost.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {   //Si la conexión a la base de datos funciona, ejecuta el bloque de código dentro del then
        try {
            return createPost('675af0cbfefcaf67301328f4', "https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=600", 'lost', 'cat', 'female', 'We have lost our Pug', {
                "coordinates": [
                    41.5064041,
                    2.3913883
                ],
                "address": "Vilassar de Mar, Maresme, Barcelona, Catalonia, 08340, Spain",
                "province": "Barcelona"
            })
                .then(console.log) //Si el post se crea correctamente, muestra el resultado en la consola
                .catch(console.error)//Si hay un error mientras se crea el post, muestra el error en la consola
        } catch (error) {  // // "Si algo falla, captura el error aquí"
            console.error(error)
        }
    })
    .catch(console.error)// Manejo de errores con la conexión a la base de datos
    .finally(() => db.disconnect())