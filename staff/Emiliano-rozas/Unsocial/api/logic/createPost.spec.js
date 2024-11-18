import 'dotenv/config'

import *as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { Post } from 'dat'
import { errors } from 'com'

const { NotFoundError } = errors

import createPost from './createPost.js'

describe('createPost', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))


    beforeEach(() => Post.deleteMany())

        instanceof ('succeds on create a post', () =>
            createPost('67321cb077f45c936bc2b2a0', 'https://cdn.memegenerator.es/imagenes/memes/full/31/72/31722367.jpg', 'Como estan los maquina?')
                .then(() => Post.findOne)
        )










})