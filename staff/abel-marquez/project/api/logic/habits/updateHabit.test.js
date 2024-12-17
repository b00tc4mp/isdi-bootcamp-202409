import 'dotenv/config';
import updateHabit from './updateHabit.js';
import db from 'dat';

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            return updateHabit('675ace02a28a390d912bc40e', '675b0ff9158704bcf2d74f47', {
                name: 'correr si',
                emoji: '👀',
                category: 'salud y bienestar',
                subcategory: 'hacer ejercicio'
            });
        } catch (error) {
            console.error(error)
        }
    })
    .then(habit => console.log(habit)) 
    .catch(error => console.error(error.message)) 
    .finally(() => db.disconnect());
