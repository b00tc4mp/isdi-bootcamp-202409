import mongoose from 'mongoose';

const { Schema, model, Types: { ObjectId } } = mongoose;

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
        maxLength: 200
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
});

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
        required: true,
        default: Date.now
    },
    likes: [{
        type: ObjectId,
        ref: 'User'
    }],
    comments: [comment]
}, { versionKey: false });

const User = model('User', user);
const Post = model('Post', post);
const Comment = model('Comment', comment);

export {
    User,
    Post,
    Comment
}