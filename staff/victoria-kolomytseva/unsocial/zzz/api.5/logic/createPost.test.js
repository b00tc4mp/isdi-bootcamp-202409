import db from 'dat'
import createPost from './createPost.js'

db.connect('mongodb://127.0.0.1:27017/unsocial-test')
    .then(() => {
        try {
            return createPost('673102adab634f097e0719f9', "https://media.istockphoto.com/id/1154370446/es/foto/divertido-mapache-en-gafas-de-sol-verdes-que-muestra-un-gesto-de-rock-aislado-sobre-fondo.jpg?s=612x612&w=0&k=20&c=XyRHmlfm_g3XQi8UXjZTzvMY_cfXCImzbzvkg5drzxE=", 'hola mundo')
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect())