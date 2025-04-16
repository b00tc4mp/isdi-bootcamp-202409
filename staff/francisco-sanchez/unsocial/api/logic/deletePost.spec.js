import 'dotenv/config' // Carga variables de entorno desde un archivo `.env`.

import * as chai from 'chai' // Librería de aserciones (expectativas) para los tests.
import chaiAsPromised from 'chai-as-promised'; // Extensión de Chai para manejar promesas de forma más intuitiva.

chai.use(chaiAsPromised) // Configuramos Chai para trabajar con promesas.
const { expect } = chai // Desestructuramos el método `expect` para escribir las expectativas del test.

import db, { User, Post } from 'dat' // Importamos el acceso a la base de datos y los modelos de datos necesarios.
import { errors } from 'com' // Importamos las clases de errores personalizadas.

const { ValidationError, NotFoundError, OwnershipError } = errors // Desestructuramos los errores que vamos a usar.

import deletePost from './deletePost.js' // Importamos la función `addComment` que vamos a probar.


describe('deletePost', () => {

    before(() => db.connect(process.env.MONGO_URL_TEST))
    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    //Caso 1. Test verifica que se puede borrar el post
    it('succeeds for deleting post', () => {
        const user = new User({ name: 'Voromir', email: 'voromir@middleearth.com', username: 'voromir', password: 'voromir' })
        const post = new Post({ author: user.id, image: 'https://image.com', text: 'hola manola' })

        // Guardamos el usuario y el post en la base de datos.
        return Promise.all([user.save(), post.save()])
            .then(([user, post]) =>
                deletePost(user.id, post.id)
                    .then(() => Post.findById(post.id))
                    .then(post => {
                        expect(post).to.not.exist
                    })
            )

    })

    //Caso 2. El usuario no existe

    it('fails o non-user exist', () =>
        expect(

            Post.create({ author: '012345678901234567890123', image: 'https://image.com', text: 'hola manola' })
                .then(post =>
                    deletePost('012345678901234567890999', post.id)
                )

        ).to.be.rejectedWith(NotFoundError, /^user not found$/)
    )


    //Caso 3. El usuario no es el autor del post
    it('fails on non-author of the post', () =>
        expect(
            // Crear el primer usuario (autor del post)
            User.create({ name: 'Voromir', email: 'voromir@middleearth.com', username: 'voromir', password: 'voromir' })
                .then(author =>
                    // Crear un post asociado al primer usuario
                    Post.create({ author: author.id, image: 'https://image.com', text: 'hola manola' })
                        .then(post =>
                            // Crear un segundo usuario (no autor del post)
                            User.create({ name: 'Bilbo', email: 'bilbo@middleearth.com', username: 'bilbo', password: 'bilbo' })
                                .then(nonAuthor =>
                                    // Intentar borrar el post con el segundo usuario
                                    deletePost(nonAuthor.id, post.id)
                                )
                        )
                )
        ).to.be.rejectedWith(OwnershipError, /^User is not the author of the post$/)
    )

    //Caso 4. El post a eliminar no existe
    it('fails o non-existing post', () =>
        expect(
            User.create({ name: 'Voromir', email: 'voromir@middleearth.com', username: 'voromir', password: 'voromir' })
                .then(author =>
                    Post.create({ author: author.id, image: 'https://image.com', text: 'hola manola' })
                        .then(post =>
                            deletePost(author.id, '012345678901234567890123')
                        )

                )
        ).to.be.rejectedWith(NotFoundError, /^post not found$/)
    )


    after(() => db.disconnect())
})
