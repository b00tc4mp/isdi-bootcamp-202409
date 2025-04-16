import mongoose from "mongoose"

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

const comment = new Schema({
    author: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    text: {
        type: String,
        required: true,
        maxLength: 200
    },
    date: {
        type: Date,
        required: true
    }
})


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
    },
    likes: [{   //Añadimos un array para los likes con referencia al usuario
        type: ObjectId,
        ref: 'User'
    }],
    comments: [comment] //Añadimos el array para los comentarios.
}, { versionKey: false }) // También desactivamos el campo `__v` en este esquema


// Creamos el modelo "User" basado en el esquema "user"
const User = model('User', user)
// Creamos el modelo "Post" basado en el esquema "post"
const Post = model('Post', post)
// Creamos el model "Comments" basado en el esquema "comment"
const Comment = model('Comment', comment)

const models = {
    User,
    Post,
    Comment
}

export default models