import 'dotenv/config'
import fs from 'fs/promises'
import bcrypt from 'bcryptjs'

import db, { User, Post } from './index.js'

db.connect(process.env.MONGO_URL_TEST)
    .then(() => Promise.all([User.deleteMany(), Post.deleteMany()]))
    .then(() => fs.readFile('./users.csv', 'utf-8'))
    .then(csv => {

        const lines = csv.split('\n')
        //lines.forEach(console.log)

        /*
            Utilizaremos la función map para leer cada linea y extraer la info desestruturada
            Al final retornamos las promesas
        */


        const creations = lines.map(line => {
            const [name, email, username, password, role] = line.split(',').map(item => item.trim())
            return User.create({ name, email, username, password: bcrypt.hashSync(password, 10), role })
        })

        return Promise.all(creations)

    })
    .then(users => {
        return fs.readFile('./posts.csv', 'utf-8')
            .then(csv => {
                const lines = csv.split('\n')

                const creations = lines.map(line => {
                    const [username, image, text, date] = line.split(',').map(item => item.trim())
                    const { _id: author } = users.find(user => user.username === username)

                    const likes = []
                    const likesNumber = randomNumber(0, users.length)

                    for (let i = 0; i < likesNumber; i++) {
                        let user = randomElement(users)

                        while (likes.includes(user.id))
                            user = randomElement(users)

                        likes.push(user.id)
                    }
                    return Post.create({ author, image, text, date, likes })

                })
                return Promise.all(creations)
            })
    })
    .catch(console.error)
    .finally(() => db.disconnect())




/**
 * Devuelve un número entero aleatorio en el rango [min, max).
 * @param {number} min - Valor mínimo (incluido).
 * @param {number} max - Valor máximo (excluido).
 * @returns {number} Número entero aleatorio entre min y max.
 * Math.random(); // Resultado: 0.5843 (un número decimal entre 0 y 1)
 * Math.random() * (max - min): Ajusta el rango. Ahora el número estará entre 0 y (max - min). Ejemplo:
 * const min = 10, max = 20;
 *  Math.random() * (max - min); // Resultado: 0 a 10 (porque max - min = 10)
 * Math.floor(...): Redondea el número hacia abajo, eliminando la parte decimal, para obtener un número entero en el rango [0, max - min). Ejemplo:
 * Math.floor(7.84); // Resultado: 7 
*/
const randomNumber = (min, max) => Math.floor(Math.random() * (max - min)) + min



/**
 * Devuelve un elemento aleatorio de un array.
 * @param {Array} array - El array del que se seleccionará un elemento.
 * @returns {*} Elemento aleatorio del array.
 */
const randomElement = array => array[Math.floor(Math.random() * array.length)]