import mongoose from 'mongoose'

const { Schema, model, Types: { ObjectId } } = mongoose

const user = new Schema({
    name: {
        type: String,
        require: true,
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
        maxLength: 15
    },
    image: {
        type: String,

    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    phone: {
        type: String,
        match: /^\+\d{1,3}\d{10}$/
    },
    licenseNumber: {
        type: String,
        minLength: 4,
        maxLength: 4
    },
    role: {
        type: String,
        required: true,
        enum: ['regular', 'veterinary'],
        default: 'regular'
    }
}, { versionKey: false })

const vaccine = new Schema({

    name: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const deworn = new Schema({
    type: {
        type: String,
        required: true,
        enum: ['external', 'internal', 'both']
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const pet = new Schema({

    owner: {
        type: ObjectId,
        ref: 'User'
    },
    chip: {
        type: String,
        required: true,
        unique: true,
        minLength: 15,
        maxLength: 15
    },
    name: {
        type: String,
        required: true
    },
    race: {
        type: String,
        required: true
    },
    image: {
        type: String,

    },
    sex: {
        type: Boolean,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    sterilized: {
        type: Boolean,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true,

    },
    vaccines: [vaccine],
    deworns: [deworn]
}, { versionKey: false })



const history = new Schema({
    type: {
        type: String,
        enum: ['internal_medicine', 'opthalmology', 'traumotology', 'dermatology'],
        required: true,
    },
    pet: {
        type: ObjectId,
        ref: 'Pet',
        required: true
    },
    veterinary: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const appointment = new Schema({
    type: {
        type: String,
        enum: ['internal_medicine', 'opthalmology', 'traumotology', 'dermatology'],
        required: true
    },
    pet: {
        type: ObjectId,
        ref: 'Pet',
        required: true
    },
    veterinary: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    }

})

const User = model('User', user)
const Vaccine = model('Vaccine', vaccine)
const Deworn = model('Deworn', deworn)
const Pet = model('Pet', pet)
const History = model('History', history)
const Appointment = model('Appointment', appointment)

export {
    User,
    Vaccine,
    Deworn,
    Pet,
    History,
    Appointment
}