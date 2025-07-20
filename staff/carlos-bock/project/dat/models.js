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
    },
    role: {
        type: String,
        required: true,
        enum: ['regular', 'moderator'],
        default: 'regular'
    }
}, { versionKey: false })

const comment = new Schema({
    author: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    text: {
        type: String,
        required: true,
        maxLength: 120
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
})

const recommend = new Schema({
    author: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    image: {
        type: String,
        required: false
    },
    link: {
        type: String,
        required: false
    },
    text: {
        type: String,
        required: true,
        maxLength: 4000
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    upVotes: [{
        type: ObjectId,
        ref: 'User'
    }],
    downVotes: [{
        type: ObjectId,
        ref: 'User'
    }],
    comments: [comment],

    country: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    category: {
        type: Number,
        enum: [1, 2, 3, 4, 5, 6, 7, 8]
    },
    price: {
        type: Number,
        enum: [1, 2, 3]
    },
    subject: {
        type: String,
        required: true,
        maxLength: 100
    }

}, { versionKey: false })

const country = new Schema({
    name: {
        type: String,
        required: true
    }
}, { versionKey: false })

const city = new Schema({
    name: {
        type: String,
        country: country.id, // check data field
        required: true
    }
}, { versionKey: false })

const destination = new Schema({
    name: {
        type: Array //string
    }
})

const User = model('User', user)
const Recommend = model('Recommend', recommend)
const Comment = model('Comment', comment)
const Country = model('Country', country)
const City = model('City', city)
const Destination = model('Destination', destination)

export { User, Recommend, Comment, Country, City, Destination }