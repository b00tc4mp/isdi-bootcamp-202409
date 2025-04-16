import 'dotenv/config'

import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
const { expect } = chai

import db, { User, Post } from 'dat'
import { errors } from 'com'

const { ValidationError, NotFoundError } = errors

import addComment from './addComment.js'

describe('addComment', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST))
    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

    it('succeeds for existing user', () => {

    })
})