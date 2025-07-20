import mongoose from 'mongoose'

const { Schema, model, Types: { ObjectId } } = mongoose

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
        match: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
        maxLength: 255,
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
        default: null
    },
    role: {
        type: String,
        required: false, //WILL BE TRUE
        enum: ['standard', 'provider'],
        default: 'standard'
    },
    dni: {
        type: String,
        required: false,
        maxLength: 9,
        match: /^[0-9]{8}[A-Z]$/ // Valida el formato del DNI
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
    country: {
        type: String,
        required: false,
        maxLength: 50,
    },
    province: {
        type: String,
        required: false,
        maxLength: 50,
    },
    city: {
        type: String,
        required: false,
        maxLength: 50,
    },
    postalCode: {
        type: String,
        required: false,
        maxLength: 10
    },
    address1: {
        type: String,
        required: false,
        maxLength: 255,
    },
    address2: {
        type: String,
        required: false,
        maxLength: 255,
    },
    number: {
        type: String,
        required: false,
        maxLength: 3
    },
    flat: {
        type: Number,
        required: false,
        maxLength: 3
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
        default: 'true'
    },
    customers: [{
        type: ObjectId, // Esto debe ser correcto
        ref: 'User',    // Esto debe coincidir con el modelo de usuario
        required: false // Este campo es opcional
    }],
    ownPacks: [{
        type: ObjectId,
        ref: 'Pack',
        required: false
    }],
    adquiredPacks: [{
        type: ObjectId,
        ref: 'Pack',
        required: false
    }],
    profileImage: {
        type: String,
        required: false,
        default: '',
        maxLength: 512,
    }
}, { versionKey: false })


//Model for packs configuration
const basePack = new Schema({
    user: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },

    packName: {
        type: String,
        maxLength: 50,
        required: true
    },

    description: {
        type: String,
        maxLength: 255,
        required: false
    },

    quantity: {
        type: Number,
        required: true,
    },

    unit: {
        type: String,
        required: true,
        enum: ['hours', 'units'],
        default: 'hours'
    },

    expiringTime: {
        type: Number,
        required: false,
        validate: {
            validator: function (value) {
                return value === -1 || (value >= 1 && value <= 12) //-1 means than don't have limit
            },
            message: 'expiringTime must be -1 (to unlimited) or number of month between 1 and 12'
        },
        default: -1
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

    vat: {
        type: Number,
        required: false, //TODO: Ready to add Prices with VAT
    },

    priceWithVat: {
        type: Number,
        required: false,
    }

}, { versionKey: false })




//Model por pack/customer/provider relationship
const pack = new Schema({

    refPack: {
        type: ObjectId,
        ref: 'BasePack',
        required: true
    },

    provider: {
        type: ObjectId,
        ref: 'User',
        required: true
    },

    customer: {
        type: ObjectId,
        ref: 'User',
        required: true
    },

    description: {
        type: String,
        required: false,
        maxLength: 255
    },

    timerActivated: {
        type: Date,
        required: false,
        default: null
    },

    descriptionActivityTemp: {
        type: String,
        required: false,
        maxLength: 255
    },

    originalQuantity: {
        type: Number,
        required: true,
    },

    remainingQuantity: {
        type: Number,
        required: true,
    },

    unit: {
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
        required: false,
        default: null

    },

    status: {
        type: String,
        required: true,
        enum: ['Pending', 'Active', 'Expired', 'Finished'],
        default: 'Pending'
    }
}, { versionKey: false })



//Model activity to follow up projects and repporting 
const activity = new Schema({
    pack: {
        type: String,
        required: true,
        ref: 'Pack'
    },

    date: {
        type: Date,
        required: true,
        default: null
    },

    description: {
        type: String,
        maxLength: 255,
        required: false
    },

    operation: {
        type: String,
        required: true,
        enum: ['add', 'substract', 'manual adjustment'],
    },

    quantity: {
        type: Number,
        required: true,
    },

    remainingQuantity: {
        type: Number,
        required: false, //TODO: Modificar a true cuando cambie de base de datos
    }

}, { versionKey: false })



//Model to payment control. 
const payment = new Schema({
    pack: {
        type: String,
        required: true,
        ref: 'Pack'
    },

    amount: {
        type: Number,
        required: true
    },

    currency: {
        type: String,
        required: true,
        enum: ['EUR', 'USD'],
        default: 'EUR'
    },

    date: {
        type: Date,
        required: true,
        default: null
    },

    method: {
        type: String,
        required: true,
        enum: ['card', 'bankTransfer', 'paypal', 'stripe', 'cash', 'bizum', 'others'],
    },

    status: {
        type: String,
        required: false,
        enum: ['pending', 'completed', 'partially payed', 'canceled', 'refunded', 'partially refunded', 'expired'],
        default: 'pending'
    },

    reference: {
        type: String,
        required: false,
    }

}, { versionKey: false })



const User = model('User', user)
const BasePack = model('BasePack', basePack)
const Pack = model('Pack', pack)
const Activity = model('Activity', activity)
const Payment = model('Payment', payment)


export {
    User,
    BasePack,
    Pack,
    Activity,
    Payment
}