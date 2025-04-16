// Importamos el módulo `fs` para interactuar con el sistema de archivos
import fs from 'fs'

// Exportamos un objeto por defecto que contiene propiedades con getters y setters
// para leer y escribir datos de los archivos 'users.json' y 'posts.json'
export default {
    // Getter para obtener los usuarios
    get users() {
        // Leemos el archivo 'users.json' de la carpeta 'data' y lo convertimos en texto
        const json = fs.readFileSync('./data/users.json', 'utf-8')

        // Convertimos el texto JSON en un objeto de JavaScript
        const users = JSON.parse(json)

        // Devolvemos el objeto con los datos de los usuarios
        return users
    },

    // Setter para actualizar los usuarios
    set users(users) {
        // Convertimos el objeto `users` en una cadena JSON
        const json = JSON.stringify(users)

        // Escribimos la cadena JSON en el archivo 'users.json', sobreescribiendo su contenido
        fs.writeFileSync('./data/users.json', json)
    },

    // Getter para obtener los posts
    get posts() {
        // Leemos el archivo 'posts.json' de la carpeta 'data' y lo convertimos en texto
        const json = fs.readFileSync('./data/posts.json', 'utf-8')

        // Convertimos el texto JSON en un objeto de JavaScript
        const posts = JSON.parse(json)

        // Devolvemos el objeto con los datos de los posts
        return posts
    },

    // Setter para actualizar los posts
    set posts(posts) {
        // Convertimos el objeto `posts` en una cadena JSON
        const json = JSON.stringify(posts)

        // Escribimos la cadena JSON en el archivo 'posts.json', sobreescribiendo su contenido
        fs.writeFileSync('./data/posts.json', json)
    }
}
