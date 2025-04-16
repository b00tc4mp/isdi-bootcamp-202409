import 'dotenv/config' // Carga variables de entorno desde un archivo `.env`.

import * as chai from 'chai' // Librería de aserciones (expectativas) para los tests.
import chaiAsPromised from 'chai-as-promised'; // Extensión de Chai para manejar promesas de forma más intuitiva.

chai.use(chaiAsPromised) // Configuramos Chai para trabajar con promesas.
const { expect } = chai // Desestructuramos el método `expect` para escribir las expectativas del test.

import db, { User, Post } from 'dat' // Importamos el acceso a la base de datos y los modelos de datos necesarios.
import { errors } from 'com' // Importamos las clases de errores personalizadas.

const { ValidationError, NotFoundError } = errors // Desestructuramos los errores que vamos a usar.

import addComment from './addComment.js' // Importamos la función `addComment` que vamos a probar.

describe('addComment', () => {
    // Antes de todos los tests, conectamos a la base de datos.
    before(() => db.connect(process.env.MONGO_URL_TEST))

    // Antes de cada test, limpiamos las colecciones de usuarios y posts.
    // Esto asegura que cada test comience con una base de datos limpia.
    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    // Caso 1: El test verifica que se puede añadir un comentario exitosamente para un usuario y post existentes.
    it('succeeds for existing user', () => {
        // Creamos un usuario y un post en la base de datos.
        const user = new User({ name: 'Voromir', email: 'voromir@middleearth.com', username: 'voromir', password: 'voromir' })
        const post = new Post({ author: user.id, image: 'https://image.com', text: 'hola manola' })

        // Guardamos el usuario y el post en la base de datos.
        return Promise.all([user.save(), post.save()])
            .then(([user, post]) =>
                // Llamamos a la función `addComment` para añadir un comentario al post.
                addComment(user.id, post.id, 'hello comment')
                    .then(() => Post.findOne()) // Recuperamos el post para verificar los resultados.
                    .then(post => {
                        expect(post).to.exist // Verificamos que el post exista.
                        expect(post.comments).to.have.lengthOf(1) // Verificamos que el post tenga exactamente un comentario.

                        const [comment] = post.comments // Desestructuramos el único comentario del post.
                        expect(comment.author.toString()).to.equal(user.id) // Verificamos que el autor sea el usuario que añadió el comentario.
                        expect(comment.text).to.equal('hello comment') // Verificamos que el texto del comentario sea correcto.
                        expect(comment.date).to.be.instanceOf(Date) // Verificamos que el comentario tenga una fecha válida.
                    })
            )
    })

    // Caso 2: Verifica que falle si el usuario no existe.
    it('fails on non-existing user', () =>
        expect(
            // Llamamos a `addComment` con un ID de usuario inexistente.
            addComment('012345678901234567890123', '012345678901234567890123', 'hello world')
        ).to.be.rejectedWith(NotFoundError, /^user not found$/) // Esperamos que lance un error de tipo NotFoundError con el mensaje "user not found".
    )

    // Caso 3: Verifica que falle si el post no existe.
    it('fails on non-existing post', () =>
        expect(
            // Creamos un usuario válido.
            User.create({ name: 'Voromir', email: 'voromir@middleearth.com', username: 'voromir', password: 'voromir' })
                .then(user =>
                    // Intentamos añadir un comentario a un post inexistente.
                    addComment(user.id, '012345678901234567890123', 'hello world')
                )
        ).to.be.rejectedWith(NotFoundError, /^post not found$/) // Esperamos que lance un error de tipo NotFoundError con el mensaje "post not found".
    )

    // Después de ejecutar todos los tests, desconectamos la base de datos.
    after(() => db.disconnect())
})
