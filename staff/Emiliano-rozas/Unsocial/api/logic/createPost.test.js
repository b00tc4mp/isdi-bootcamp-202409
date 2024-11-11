import db from 'dat'

import createPost from './createPost.js'

db.connect('mongodb://127.0.0.1:27017/unsocial')
    .then(() => {
        try {
            createPost('67321cb077f45c936bc2b2a0', 'https://cdn.memegenerator.es/imagenes/memes/full/31/72/31722367.jpg', 'Como estan los maquina?')
                .then(() => console.log('Post created'))
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
