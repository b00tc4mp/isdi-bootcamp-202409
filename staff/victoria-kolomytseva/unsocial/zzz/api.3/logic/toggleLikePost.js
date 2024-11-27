import { validate } from 'com'
import { storage } from '../data/index.js'

export default (userId, postId,) => { //Esta función toma dos argumentos: postId (el ID de la publicación) y userId (el ID del usuario)
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')//Asegura que postId y userId sean válidos. Si algo falla aquí, se interrumpe el proceso

    const { users, posts } = storage

    const found = users.some(({ id }) => id === userId)

    if (!found) throw new Error('user not found')


    const post = posts.find(({ id }) => id === postId) //Encuentra la publicación en posts que tenga un ID igual a postId. Si no existe, lanza un error

    if (!post) throw new Error('post not found')

    const { likes } = post //likedBy es una lista de usuarios a los que les gusta la publicación

    const index = likes.indexOf(userId)//Busca si userId ya está en likedBy. 

    if (index < 0) likes.push(userId) // Si no está (index < 0), agrega el usuario, si ya está, lo quita usando splice.
    else likes.splice(index, 1)

    storage.posts = posts //guarda la lista posts actualizada en storage
}