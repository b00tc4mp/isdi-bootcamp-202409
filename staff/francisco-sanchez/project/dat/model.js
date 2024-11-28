import mongoose, { Schema } from 'mongoose'

const { Shema, model, Types: { ObjectId } } = mongoose

//Model for packs configuration
const packConfig = new Schema({

    userId: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },

    packName: {
        type: String,
        maxLength: 50,
        required: true
    },

    packDescription: {
        type: String,
        maxLength: 255,
        required: false
    },

    quantity: {
        type: Number,
        required: true,
    },

    measureUnit: {
        type: String,
        required: true,
        enum: ['hours', 'units'],
        //default: 'hours'
    },

    expiringTime: {
        type: Number,
        required: false,
    },

    price: {
        type: Number,
        required: true
    },


    currency: {
        type: String,
        required: true,
        enum: ['EUR', 'USD'],
        default: 'EUR'
    }




}, { versionKey: false })



const addressSchema = new Schema({
    country: {
        type: String,
        required: false,
    },
    province: {
        type: String,
        required: false,
    },
    city: {
        type: String,
        required: false,
    },
    postalCode: {
        type: String,
        required: false,
    },
    street: {
        type: String,
        required: false,
    },
    street2: {
        type: String,
        required: false,
    },
    number: {
        type: String,
        required: false,
    },
    flat: {
        type: Number,
        required: false,
    },
})


//Model for users master data
const user = new Schema({

    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 5,
        maxLength: 30
    },

    password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 100
    },

    email: {
        type: String,
        required: true,
        unique: true,
        match: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    },

    plan: {
        type: String,
        required: true,
        enum: ['free', 'pro'],
        default: 'free'
    },

    planExpiryDate: {
        type: Date,
        required: false,
        default: Date.now
    },

    roles: {
        type: String,
        required: false, //WIL BE TRUE
        enum: ['standard', 'provider'],
        default: 'standard'
    },

    dni: {
        type: String,
        required: false,
        minLength: 9,
        maxLength: 9
    },

    name: {
        type: String,
        required: false,
        maxLength: 50
    },

    surname1: {
        type: String,
        required: false,
        maxLength: 50
    },

    surname2: {
        type: String,
        required: false,
        maxLength: 50
    },

    biography: {
        type: String,
        required: false,
        maxLength: 1000
    },

    adress: {
        type: ObjectId,
        ref: 'addressSchema',
        required: false
    },

    legalName: {
        type: String,
        required: false,
        maxLength: 255
    },

    website: {
        type: String,
        required: false,
        maxLength: 255
    },

    creationStatus: {
        type: String,
        required: true,
        enum: ['true', 'false', 'confirm account'],
        default: 'standard'
    },

    customers: [{
        type: ObjectId,
        ref: 'User',
        required: false
    }],

    ownPacks: {
        type: ObjectId,
        ref: 'Pack',
        required: false
    },

    adquiredPacks: {
        type: ObjectId,
        ref: 'Pack',
        required: false
    },

}, { versionKey: false })




//Model por pack/customer/provider relationship
const pack = new Schema({

    idProvider: {
        type: ObjectId,
        ref: 'user',
        required: true
    },

    idCustomer: {
        type: ObjectId,
        ref: 'user',
        required: true
    },

    description: {
        type: String,
        required: false,
        maxLength: 255
    },

    originalQuantity: {
        type: Number,
        required: true,

    },

    remmainingQuantity: {
        type: Number,
        required: true,
    },

    measureUnit: {
        type: String,
        required: true,
        enum: ['hours', 'units'],
        //default: 'hours'
    },

    price: {
        type: Number,
        required: true

    },

    currency: {
        type: String,
        required: true,
        enum: ['EUR', 'USD'],
        default: 'EUR'
    },

    purchaseDate: {
        type: Date,
        required: true,
        default: Date.now
    },

    expiryDate: {
        type: Date,
        required: true,
        default: Date()

    },

    paymentStatus: {
        type: String,
        required: true,
        enum: ['Pending', 'Partially Payed', 'Payed', 'Refunded'],
        default: 'Pending'
    },

    packStatus: {
        type: String,
        required: true,
        enum: ['Pending', 'Active', 'Expired', 'Finnished'],
        default: 'Pending'
    }
}, { versionKey: false })



//Model history to follow up projects and repporting 
const history = new Schema({


}, { versionKey: false })



//Model to payment control. 
const payment = new Schema({


}, { versionKey: false })



const PackConfig = model('PackConfig', packConfig)
const AddressSchema = model('AddressSchema', addressSchema)
const User = model('User', user)
const Pack = model('Pack', pack)
const History = model('History', history)
const Payment = model('Payment', payment)


export {
    AddressSchema,
    PackConfig,
    User,
    Pack,
    History,
    Payment
}