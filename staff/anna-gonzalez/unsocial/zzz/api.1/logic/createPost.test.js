import db from 'dat'
import createPost from './createPost.js'

db.connect('mongodb://localhost/unsocial-test')
    .then(() => {
        try {
            return createPost('672e1ed8d36186d1eaf683b1', 'https://images.squarespace-cdn.com/content/v1/6137f1eafdd46630c1744367/118c6bda-87ce-422c-95eb-1c8085e160f4/DSC00486-2.jpg', 'hola patagonia')
                .then(console.log) //undefined
                .catch(console.error)
        } catch (error) {
            console.error(error)
        }
    })
    .catch(console.error)
    .finally(() => db.disconnect()) //el finally se pone cuando se quiere hacer algo sí o sí, pase lo q pase