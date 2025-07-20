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
    password: {
        type: String,
        required: true,
        minLength: 5
    },
    surname: {
        type: String,
    },
    phone: {
        type: String,
    },
    city: {
        type: String,
    },
    postalCode: {
        type: String,
    },
    role: {
        type: String,
        enum: ['user', 'admin'], // Diferentes niveles de administrador
        default: 'user',
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
    },
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
        maxLength: 500
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    whatHappened: {
        type: String,
        enum: ["lost", "found"],
        required: true
    },
    petType: {
        type: String,
        required: true,
        enum: ["cat", "dog", "ferret"]
    },
    petGender: {
        type: String,
        required: true,
        enum: ["female", "male"]
    },
    likes: [{
        type: ObjectId,
        ref: 'User'
    }],
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        province: {
            type: String,
            required: true,
        }
    },


    comments: [comment]
}, { versionKey: false })


const report = new Schema({
    reportedId: {
        type: Schema.Types.ObjectId, // ID del usuario reportado
        ref: 'User',
        required: true,
    },
    reason: {
        type: String, // Motivo del reporte
        required: true,
    },
    reportedBy: {
        type: Schema.Types.ObjectId, // ID del usuario que hizo el reporte
        ref: 'User',
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'reviewed', 'resolved'], // Estado del reporte
        default: 'pending',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
}, { versionKey: false })


const User = model('User', user)
const Post = model('Post', post)
const Comment = model('Comment', comment)
const Report = model('Report', report)

export {
    User,
    Post,
    Comment,
    Report

}