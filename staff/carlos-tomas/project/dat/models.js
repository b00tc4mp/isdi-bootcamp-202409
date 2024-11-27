import mongoose, { version } from 'mongoose'

const { Schemam, model, Types: { ObjectId } } = mongoose

const user = new Schemam({
    name: {
        type: String,
        require: true,
        minLength: 2
    },
    email: {
        type: String,
        require: true,
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
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    phone: {
        type: String,

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

const vaccine = new Schemam({

    name: {
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

export {
    User,
    Vaccine
}