import 'dotenv/config'

import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);
const { expect } = chai;

import db, { User, Post } from 'dat';
import { errors } from 'com';

const { NotFoundError, ValidationError, SystemError } = errors;

import addComment from './addComment.js';

debugger

describe('addComment', () => {
    before(() => db.connect('mongodb://localhost:27017/unsocial-test'));

    beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]));

    it('succeeds for exisint user', () => {
        const user = new User({ name: 'Ethan Hunt', email: 'hunt@imf.gov', username: 'ehunt', password: '123123123'});
        const comment = new Comment({ author: user.id, text: 'mission accomplished'});

        return Promise.all([user.save(), post.save()])
            .then(([user, post]) => 
                addComment(user.id, post.id, 'mission accomplished')
                    .then(() => Post.findOne())
                    .then(post => {
                        expect(post).to.be.exist
                        expect(post.comments).to.have.lengthOf(1)

                        const [comment] = post.comments;
                        expect(comment.author.toString()).to.equal(user.id);
                        expect(comment.text).to.equal('hello comment');
                        expect(comment.date).to.be.instanceOf(Date);
                    })
                    
            )
    })

    it('fails on nos-existing user', () => 
        expect(
            addComment('012345678901234567890123', '012345678901234567890123', 'mission failure')
        ).to.be.rejectedWith(NotFoundError, /^user not found$/ )
    )

    it('fails on non-existing post', () => 
        expect(
            user.create({ name: 'Ethan Hunt', email: 'hunt@imf.gov', username: 'ehunt', password: '123123123'})
                .then(user => 
                    addComment(user.id, '012345678901234567890123', 'mission failure')
                )
        ).to.be.rejectedWith(NotFoundError, /^post not found$/)
    )

    after(() => db.disconnect());
})



//    User.create( { name: 'Ethan Hunt', email: 'hunt@imf.gov', username: 'ehunt', password: '123123123'} )
