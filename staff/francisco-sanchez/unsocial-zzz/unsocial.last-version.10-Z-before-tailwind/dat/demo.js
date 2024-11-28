import mongoose from 'mongoose'

import models from './models.js'

const { User, Post, Comment } = models

// Conectamos a la base de datos MongoDB llamada "unsocial-test2"
mongoose.connect('mongodb://localhost/unsocial-test2')
    .then(() =>
        // Una vez conectados, eliminamos todos los documentos de ambas colecciones para limpiar la base de datos
        Promise.all([
            User.deleteMany({}), // Elimina todos los usuarios
            Post.deleteMany({})  // Elimina todos los posts
        ])
    )
    .then(() => {
        // Creamos una instancia de usuario con los datos iniciales
        const user = new User({ name: 'Peter Pan', email: 'peter@pan.com', username: 'peterpan', password: '123123123' })

        // Guardamos el usuario en la base de datos
        return user.save()
    })
    .then(user => {
        // Mostramos el usuario guardado en la consola
        console.log(user)

        // Creamos una instancia de post, asignando el ID del usuario como "author"
        const post = new Post({ author: user._id, image: 'http://www.image.com/123', text: 'hola mundo', date: new Date })

        // Creamos una instanacia de Comment, y asigamos el ID de usuario com autor del comentario
        const comment = new Comment({ author: user._id, text: 'hola comment', date: new Date })


        //Añadimos el comentario al post
        post.comments.push(comment)

        // Guardamos el post en la base de datos
        return post.save()

    })
    .then(post => {
        // Mostramos el post guardado en la consola
        console.log(post)
    })
    .catch(console.error) // Captura y muestra cualquier error en el proceso
    .finally(() => mongoose.disconnect()) // Finalmente, desconectamos de la base de datos