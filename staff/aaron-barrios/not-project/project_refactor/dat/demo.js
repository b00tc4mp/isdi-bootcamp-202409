import mongoose from 'mongoose'

import models from './models.js'

const { User, Post, Comment } = models

mongoose.connect('mongodb://localhost/unsocial-test')
    .then(() => Promise.all([
        User.deleteMany({}),
        Post.deleteMany({})
    ]))
    .then(() => {
        const user = new User({ name: 'Peter pan', email: 'peter@pan.com', username: 'peterpan', password: '123' })

        return user.save()
    })
    .then(user => {
        console.log(user)

        const post = new Post({ author: user._id, image: 'http://www.image.com/123', text: 'holaaa', date: new Date })

        const comment = new Comment({ author: user._id, text: 'comment', date: new Date })
        post.comments.push(comment)


        return post.save()
    })
    .then(post => {
        console.log(post)
    })
    .catch(console.error)
    .finally(() => mongoose.disconnect())