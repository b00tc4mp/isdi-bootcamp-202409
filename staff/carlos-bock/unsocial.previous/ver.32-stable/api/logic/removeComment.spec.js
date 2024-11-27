import 'dotenv/config';
//add ethan hunt to the database
import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);
const { expect } = chai; 

import db, { Post, User } from 'dat';
import { errors } from 'com';

const { NotFoundError, OwnershipError, ValidationError, SystemError } = errors;

import removeComment from './removeComment.js';

debugger;

describe('removeComment', () => {
    before(() => db.connect('mongodb://localhost:27017/unsocial-test')); //process.env.MONGO_URL_TEST

    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]));

    it('succeeds on existing user', () => {
        const user = new User({ name: 'Ethan Hunt', email: 'hunt@imf.gov', username: 'ehunt', password: '123123123'});
        const comment = new Comment({ author: user.id, text: 'mission accomplished'});
        const post = new Post({ author: user.id, image: 'https://cdn.theasc.com/Mission-Impossible-Featured.jpg', text: 'well done'});

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

    it('fails on non-existing port', () => 
    expect(
        user.create({ name: 'Ethan Hunt', email: 'hunt@imf.gov', username: 'ehunt', password: '123123123'})
            .then(user => 
                removeComment(user.id, '012345678901234567890123','012345678901234567890123')
            )
    ).to.be.rejectedWith(NotFoundError, /^post not found$/)
)

    it('fails on non-existing comment', () => {
        const user = new User({ name: 'Ethan Hunt', email: 'hunt@imf.gov', username: 'ehunt', password: '123123123'} )
        const post = new Post({  author: user.id, image: 'https://cdn.theasc.com/Mission-Impossible-Featured.jpg', text: 'well done'})

        return expect(
            Promise.all([user.save(), post.save()])
                .then(([user, post]) =>
                    removeComment(user.id, post.id, '012345678901234567890123')
            )
        ).to.be.rejectedWith(NotFoundError, /^comment not found$/)

    })

    it('fails on non-own comment', () => {
        const user = new User({ name: 'Ethan Hunt', email: 'hunt@imf.gov', username: 'ehunt', password: '123123123'} )
        const post = new Post({ author: user.id, image: 'https://cdn.theasc.com/Mission-Impossible-Featured.jpg', text: 'well done'})
        const user2 = new User({ name: 'Ethan Hunt2', email: 'hunt2@imf.gov', username: 'ehunt2', password: '123123123'} )
        const post2 = new Post({ author: user.id, image: 'https://cdn.theasc.com/Mission-Impossible-Featured.jpg', text: 'well done', comments: [comment]})
 
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
