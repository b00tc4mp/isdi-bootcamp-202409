import mongoose from 'mongoose'

const { Schema, model, Types: { ObjectId } } = mongoose

const user = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 2
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    },
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    }
}, { versionKey: false })

const post = new Schema({
    author: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    image: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true,
        maxLength: 200
    },
    date: {
        type: Date,
        required: true
    }
}, { versionKey: false })

const User = model('User', user)
const Post = model('Post', post)

mongoose.connect('mongodb://localhost/unsocial-test')
    .then(() => Promise.all([
        User.deleteMany({}),
        Post.deleteMany({})
    ]))
    .then(() => {
        const user = new User({ name: 'Peter Pan', email: 'peter@pan.com', username: 'peterpan', password: '123123123' })

        return user.save()
    })
    .then(user => {
        console.log(user)

        const post = new Post({ author: user._id, image: 'http://www.image.com/123', text: 'hola mundo', date: new Date })

        return post.save()
    })
    .then(post => {
        console.log(post)
    })
    .catch(console.error)
    .finally(() => mongoose.disconnect())