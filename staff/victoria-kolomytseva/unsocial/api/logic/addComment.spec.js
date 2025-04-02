import 'dotenv/config'//// Carga variables de entorno

import * as chai from 'chai'//// Importa la biblioteca Chai
import chaiAsPromised from 'chai-as-promised';//// Extensión para pruebas con promesas
//victoria eres muy maja

chai.use(chaiAsPromised) // Configura chai para trabajar con promesas
const { expect } = chai// Extrae el método `expect` para realizar aserciones

import db, { User, Post } from 'dat' // Importa base de datos y modelos
import { errors } from 'com' // Importa errores personalizados

const { NotFoundError, ValidationError, SystemError } = errors

import addComment from './addComment.js'


debugger

describe('addComment', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))//// Conecta a la base de datos antes de las pruebas


    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()])) // Limpia usuarios y publicaciones antes de cada prueba

    it('succeeds for existing user', () => {
        const user = new User({ name: 'Coco Loco', email: 'coco@loco.com', username: 'cocoloco', password: '123123123' })
        const post = new Post({ author: user.id, image: 'https://www.image.com', text: 'hello world' })

        return Promise.all([user.save(), post.save()])
            .then(([user, post]) =>
                addComment(user.id, post.id, 'hello comment')
                    .then(() => Post.findOne())// Busca la publicación actualizada
                    .then(post => {
                        expect(post).to.exist // Verifica que la publicación existe
                        expect(post.comments).to.have.lengthOf(1) // Debe tener un comentario

                        const [comment] = post.comments  // Verifica los datos del comentario
                        expect(comment.author.toString()).to.equal(user.id)
                        expect(comment.text).to.equal('hello comment')
                        expect(comment.date).to.be.instanceOf(Date)
                    })
            )
    })
    // Segunda prueba: Falla si el usuario no existe
    it('fails on non-existing user', () =>
        expect(
            addComment('012345678901234567890123', '012345678901234567890123', 'hello world')
        ).to.be.rejectedWith(NotFoundError, /^user not found$/)
    )
    // Tercera prueba: Falla si la publicación no existe
    it('fails on non-existing post', () =>
        expect(
            User.create({ name: 'Coco Loco', email: 'coco@loco.com', username: 'cocoloco', password: '123123123' })
                .then(user =>
                    addComment(user.id, '012345678901234567890123', 'hello world')
                )
        ).to.be.rejectedWith(NotFoundError, /^post not found$/)
    )

    // TODO add validation error test cases
    // TODO add system error test cases

    after(() => db.disconnect())
})
