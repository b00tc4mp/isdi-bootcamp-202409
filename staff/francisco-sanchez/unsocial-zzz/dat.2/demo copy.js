import mongoose from 'mongoose'

// Desestructuramos objetos de mongoose
const { Schema, model, Types: { ObjectId } } = mongoose

// Definimos el esquema (estructura) para los documentos de la colección "User"
const user = new Schema({
    name: {
        type: String, // El campo "name" debe ser de tipo String
        required: true, // Este campo es obligatorio
        minLength: 2 // Longitud mínima de 2 caracteres
    },
    email: {
        type: String, // El campo "email" debe ser de tipo String
        required: true, // Este campo es obligatorio
        unique: true, // Este campo debe ser único en la base de datos
        // Expresión regular para verificar el formato de un email válido
        match: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    },
    username: {
        type: String, // El campo "username" debe ser de tipo String
        required: true, // Este campo es obligatorio
        unique: true, // Este campo debe ser único en la base de datos
        minLength: 3, // Longitud mínima de 3 caracteres
        maxLength: 30 // Longitud máxima de 30 caracteres
    },
    password: {
        type: String, // El campo "password" debe ser de tipo String
        required: true, // Este campo es obligatorio
        minLength: 8 // Longitud mínima de 8 caracteres
    }
}, { versionKey: false }) // Desactivamos el campo `__v` que Mongoose añade automáticamente para controlar las versiones

// Definimos el esquema para los documentos de la colección "Post"
const post = new Schema({
    author: {
        type: ObjectId, // El campo "author" es un ID de tipo ObjectId, que hace referencia a un usuario
        required: true, // Este campo es obligatorio
        ref: 'User' // Hace referencia al modelo "User", lo que permite usar "populate" para traer datos del autor
    },
    image: {
        type: String, // El campo "image" debe ser de tipo String (URL de la imagen)
        required: true // Este campo es obligatorio
    },
    text: {
        type: String, // El campo "text" debe ser de tipo String
        required: true, // Este campo es obligatorio
        maxLength: 200 // Longitud máxima de 200 caracteres
    },
    date: {
        type: Date, // El campo "date" es de tipo Date (fecha)
        required: true // Este campo es obligatorio
    }
}, { versionKey: false }) // También desactivamos el campo `__v` en este esquema

// Creamos el modelo "User" basado en el esquema "user"
const User = model('User', user)
// Creamos el modelo "Post" basado en el esquema "post"
const Post = model('Post', post)

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

        // Guardamos el post en la base de datos
        return post.save()
    })
    .then(post => {
        // Mostramos el post guardado en la consola
        console.log(post)
    })
    .catch(console.error) // Captura y muestra cualquier error en el proceso
    .finally(() => mongoose.disconnect()) // Finalmente, desconectamos de la base de datos
