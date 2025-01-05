import createPost from './createPost.js'

try {
    createPost('m2vvw4xzn6d', "https://media.istockphoto.com/id/1154370446/es/foto/divertido-mapache-en-gafas-de-sol-verdes-que-muestra-un-gesto-de-rock-aislado-sobre-fondo.jpg?s=612x612&w=0&k=20&c=XyRHmlfm_g3XQi8UXjZTzvMY_cfXCImzbzvkg5drzxE=", 'hola mundo')
} catch (error) {
    console.error(error)
}