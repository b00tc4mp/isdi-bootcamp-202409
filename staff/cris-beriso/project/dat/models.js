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

const comment = new Schema({
  author: {
    type: ObjectId,
    required: true,
    ref: 'User'
  },
  text: {
    type: String,
    required: true,
    maxLength: 300,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  }
})

const point = new Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true,
    default: 'Point'
  },
  coord: {
    type: [Number],
    required: true
  }
})

const location = new Schema({
  address: {
    type: string,
    maxLength: 100,
    required: false
  },
  location: {
    type: point,
    required: false
  }
})

const store = new Schema({
  name: {
    type: string,
    required: true,
    maxLength: 150
  },
  web: {
    type: string,
    required: true,
    maxLength: 200
  },
  locations: [location]
})

const storePrice = new Schema({
  store: [{
    type: ObjectId,
    ref: 'Store'
  }],
  price: {
    type: Number,
    required: true
  }
})

const product = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 10,
    maxLength: 100,
  },
  category: {
    type: String,
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
  storePrices: [storePrice],
  comments: [comment]
}, { versionKey: false })


const User = model('User', user)
const Product = model('Product', product)
const StorePrice = model('StorePrice', storePrice)
const Comment = model('Comment', comment)
const Store = model('Store', store)
const Location = model('Location', location)
const Point = model('Point', point)

export {
  User,
  Comment,
  Point,
  Location,
  Store,
  StorePrice,
  Product
}