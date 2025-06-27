import 'dotenv/config'
import db from 'dat'
import createPost from './createPost.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => {
        try {
            createPost('67360f27e423c4f6cd124492', 'https://cdn.memegenerator.es/imagenes/memes/full/31/72/31722367.jpg', 'Como estan los maquina?')
                .then(() => console.log('Post created'))
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
