import db from 'dat';

import registerUser from './registerUser.js'

db.connect('mongodb://127.0.0.1:27017/unsocial-test')
    .then(() => {
        try {
            return registerUser('Coco Drilo', 'coco@drilo.com', 'cocodrilo', '123123123', '123123123')
                .then(() => console.log('User Registered'))
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)

    //Despues de ejecutar una consulta deberíamos cerrar la conexión para optimizar recursos
    .finally(() => db.disconnect())

/*import registerUser from './registerUser.js'

try {
    registerUser('Coco Drilo', 'coco@drilo.com', 'cocodrilo', '123123123', '123123123')
} catch (error) {
    console.error(error)
}*/