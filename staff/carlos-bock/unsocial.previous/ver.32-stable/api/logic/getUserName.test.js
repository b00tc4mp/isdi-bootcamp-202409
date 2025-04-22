import 'dotenv/config';
import db from 'data';
import getUserName from './getUserName.js';

db.connect('mongodb://localhost:27017/unsocial-test')
    .then(() => {
        try {
            getUserName('672e3fc39cee3ea8fbf6dc72','672e3fc39cee3ea8fbf6dc72') // reemplazar ids
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error);
        }
    })
    .catch(console.error);