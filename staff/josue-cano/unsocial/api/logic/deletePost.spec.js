import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Post } from 'dat'
import { errors } from "../../com/index.js"

const { SystemError, NotFoundError, OwnershipError} = errors 

import deletePost from './deletePost.js';

//describe es para indicar de que traba la prueba
describe('deletePost', () => {
    before (() => db.connect(process.env.MONGO_URL_TEST))
//antes de cada prueba
    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))
//la prueba efectiva borrar post
    it('succes delete post', () => {
        const user = new User({ name: 'Coco Loco', email: 'coco@loco.com', username: 'cocoloco', password: '123123123' })
        const post = new Post({ author: user.id, image: 'https://www.image.com', text: 'hello world' })

        //guarda el usuario en la base de datos
        user.save()
        //ahora si guarda me guardas el post
        .then(() => post.save())
// si se gurda el post lo borro
        .then(()=> {
            deletePost(user.id, post.id)
            //si se borra lo buscas
            .then(() =>  Post.findById(post.id))
            //evaluo el post
            .then(post => {
                expect(post).to.be.null

            }
            )
        })
            
    })

   
})

