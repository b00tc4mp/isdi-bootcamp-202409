import mongoose from 'mongoose'

const { Schema, model, Types: { ObjectId } } = mongoose

const point = new Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true,
        default: 'Point'
    },
    coordinates: {
        type: [Number],
        required: true
    }
})

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
        minLength: 3,
        maxLength: 60
    },
    role: {
        type: String, 
        required: false, 
        enum: ['customer', 'partner'],
        default: 'customer'
    }, 
    pets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pet' }]
}, { versionKey: false })

const category = new Schema({
    name: {
        type: String, 
        required: true, 
        minLength: 2
    },
    description: {
        type: String,
        default: ''
    }
}, { versionKey: false })

const pet = new Schema({
    name: { type: String, required: true, minLength: 2 },
    species: { type: String, enum: ['dog', 'cat'], required: true },
    birthDate: { type: Date, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { versionKey: false })

const partner = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 2
    },
    image: {
        type: String,
    },
    categories: [{
        type: ObjectId,
        ref: 'Category', 
    }],
    location: {
        type: point,
        required: true
    },
    city: { 
        type: String, 
        required: true 
    },
    postalCode: { 
        type: String, 
        required: true 
    }
}, { versionKey: false });

const locationSchema = new Schema({
  address: {
    type: String,
    maxLength: 100,
    required: false
  },
  location: {
    type: point,
    required: false
  }
}, { versionKey: false })

locationSchema.index({ location: '2dsphere' })
partner.index({ location: '2dsphere' })

const User = model('User', user)
const Category = model('Category', category)
const Partner = model('Partner', partner)
const Location = model('Location', locationSchema)
const Pet = model('Pet', pet)

export {
    User,
    Category,
    Partner,
    Location,
    Pet
}
