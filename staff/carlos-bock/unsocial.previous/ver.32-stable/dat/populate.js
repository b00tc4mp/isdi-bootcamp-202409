import 'dotenv/config';
import db, { User, Post } from './index.js';

db.connect('mongodb://localhost:27017/unsocial-test') //process.env.MONGO_URL
    .then(() => Promise.all([User.deleteMany(), Post.deleteMany()]))
    .then(() => Promise.all([
        User.create({
        name: 'Peter Parker',
        email: 'peter@db.com',
        username: 'pparker',
        password: '123123123',
        role: 'regular'  
    }),
    User.create({
        name: 'Samurai Jack',
        email: 'jack@samurai.jp',
        username: 'samurai',
        password: '123123123',
        role: 'regular'
    }),
    User.create({
        name: 'Puss in Boots',
        email: 'puss@boots.com',
        username: 'theboots',
        password: '123123123',
        role: 'regular'
    })]))
    .then(([peter, jack, puss]) => Promise.all([
        Post.create({
            author: peter.id,
            image: 'https://img2.rtve.es/i/?w=1600&i=1442912664626.jpg',
            text: 'friendly neighboorhood...'
        }),
        Post.create({
            author: puss.id,
            image: 'https://m.media-amazon.com/images/M/MV5BZWEzN2M2MjgtYzc4YS00Yjg5LWJjMGEtNGM5NTEyMjE0ZDE2XkEyXkFqcGc@._V1_QL75_UX525_.jpg',
            text: 'fear me!'
        })
    ]))
    .catch(console.error)
    .finally(() => db.disconnect())