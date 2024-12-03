import mongoose from 'mongoose'

const { Schema, model, Types: { ObjectId } } = mongoose

const user = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 15
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
    maxLength: 40
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
    minLength: 8,
    maxLength: 100
  },
  role: {
    type: String,
    required: true,
    enum: ['regular', 'admin'],
    default: 'regular'
  },
  wishlist: [{
    type: ObjectId,
    ref: 'Product'
  }]
}, { versionKey: false })

const product = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 10,
    maxLength: 100,
  },
  image: {
    type: String, //cambiar a array de strings
    required: true,
  },
  description: {
    type: String,
    required: true,
    minLength: 20,
    maxLength: 500,
  },
  likes: [{
    type: ObjectId,
    ref: 'User'
  }],
  dislikes: [{
    type: ObjectId,
    ref: 'User'
  }],
  //storePrices: [storePrice],
  //comments: [comment]
}, { versionKey: false })

// const storePrice = new Schema({
//   store: [{
//     type: ObjectId,
//     ref: 'Store'
//   }],
//   price: {
//     type: Number,
//     required: true
//   }
// })

// const comment = new Schema({
//   author: {
//     type: ObjectId,
//     required: true,
//     ref: 'User'
//   },
//   text: {
//     type: string,
//     required: true,
//     maxLength: 300,
//   },
//   date: {
//     type: Date,
//     required: true,
//     default: Date.now
//   }
// })

// const store = new Schema({
//   web: {
//     type: string,
//     required: true,
//     maxLength: 200
//   },
//   locations: [location]
// })

// const location = new Schema({
//   address: {
//     type: string,
//     required: false,
//     maxLength: 100,
//   },
//   location: {
//     type: ObjectId,
//     ref: 'Point'
//   }
// })

// const point = new Schema({
//   type: string,
//   coord: [number]
// })

const User = model('User', user)
const Product = model('Product', product)
// const StorePrice = model('StorePrice', storePrice)
// const Comment = model('Comment', comment)
// const Store = model('Store', store)
// const Location = model('Location', location)
// const Point = model('Point', point)

export {
  User,
  Product
  // StorePrice,
  // Comment,
  // Store,
  // Location,
  // Point
}