import 'dotenv/config';

import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);
const { expect } = chai; 

import db, { Post, User, Comment } from 'dat';
import { errors } from 'com';

const { NotFoundError, OwnershipError, ValidationError, SystemError } = errors;

import removeComment from './removeComment.js';

debugger;

describe('removeComment', () => {
    before(() => db.connect(process.env.MONGO_URL_TEST)); //process.env.MONGO_URL_TEST'mongodb://localhost:27017/unsocial-test'

    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]));

    it('succeeds on existing user', () => {
        const user = new User({ name: 'Ethan Hunt', email: 'hunt@imf.gov', username: 'ethanhunt', password: '123123123'});
        const comment = new Comment({ author: user.id, text: 'hello'});
        const post = new Post({ author: user.id, image: 'https://www.image.com', text: 'hello', comments: [comment]});

        return Promise.all([user.save(), post.save()])
            .then(([user, post]) => 
                removeComment(user.id, post.id, post.comments[0].id)
                .then(() => Post.findOne())    
                .then(post => {
                    expect(post).to.exist
                    expect(post.comments).to.have.lengthOf(0)
                })
            )
    })

    it('fails on non-existing user', () => 
        expect(
            removeComment('012345678901234567890123', '012345678901234567890123', '012345678901234567890123')
        ).to.be.rejectedWith(NotFoundError, /^user not found$/)
    )

    it('fails on non-existing post', () => 
    expect(
        user.create({ name: 'Ethan Hunt', email: 'hunt@imf.gov', username: 'ethanhunt', password: '123123123'})
            .then(user => 
                removeComment(user.id, '012345678901234567890123','012345678901234567890123')
            )
    ).to.be.rejectedWith(NotFoundError, /^post not found$/)
)

    it('fails on non-existing comment', () => {
        const user = new User({ name: 'Ethan Hunt', email: 'hunt@imf.gov', username: 'ethanhunt', password: '123123123'} )
        const post = new Post({ author: user.id, image: 'https://www.image.com', text: 'hello' })

        return expect(
            Promise.all([user.save(), post.save()])
                .then(([user, post]) =>
                    removeComment(user.id, post.id, '012345678901234567890123')
            )
        ).to.be.rejectedWith(NotFoundError, /^comment not found$/)

    })

    it('fails on non-own comment', () => {use
        const user = new User({ name: 'Ethan Hunt', email: 'hunt@imf.gov', username: 'ethanhunt', password: '123123123'} )
        const user2 = new User({ name: 'Ethan Hunt2', email: 'hunt2@imf.gov', username: 'ethanhunt2', password: '123123123'} )
        const comment = new Comment({ author: user.id, text: 'hello' })
        const post = new Post({ author: user.id, image: 'https://www.image.com', text: 'hello', comments: [comment] })
 
        return expect(
            Promise.all([user.save_(), user2.save(), post.save()])
                .then(([user, user2, post]) => 
                    removeComment(user2.id, post.id, post.comments[0].id)
                )
        ).to.be.rejectedWith(OwnershipError, /^user not author of comment$/)
    })

    after(() => db.disconnect());
})




//    User.create( { name: 'Ethan Hunt', email: 'hunt@imf.gov', username: 'ehunt', password: '123123123'} )
