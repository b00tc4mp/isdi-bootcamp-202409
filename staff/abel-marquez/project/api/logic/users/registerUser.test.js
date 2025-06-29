import 'dotenv/config';
import db from 'dat';
import registerUser from './registerUser.js';

db.connect(process.env.MONGO_URL_TEST)
    .then(() => 
        registerUser('Abel', 'abel@example.com', 'abelmarquez', '123123123', '123123123')
        .then(() => console.log('1er usuario registrado'))
        .catch(console.error)
        .then(() => registerUser('Chicho', 'chicho@chicho.com', 'ElChicho', '123123123', '123123123'))
        .then(() => console.log( '2 usuario registrado ')) // undefined
            .catch(console.error)
    )
    .catch(console.error)
    .finally(() => db.disconnect());
