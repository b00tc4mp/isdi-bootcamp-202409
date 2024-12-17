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
        match: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
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
        enum: ['regular', 'moderator'],
        default: 'regular',
    },
    street: {
        type: String,
        default: '',
        maxLength: 100
    },
    city: {
        type: String,
        default: '',
        maxLength: 30

    },
    country: {
        type: String,
        default: '',
        maxLength: 30
    },
    postalCode: {
        type: String,
        default: '',
        maxLength: 30,
        match: /^[A-Za-z0-9\s]{4,10}$/
    },
    phone: {
        type: String,
        default: '',
        maxLength: 30,
        match: /^\+?[1-9]\d{1,14}$/
    },
}, { versionKey: false });

const review = new Schema({
    author: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    text: {
        type: String,
        required: true,
        maxLength: 200
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
}, { versionKey: false });


const product = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    publisher: {
        type: String,
        required: true
    },
    isbn: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        maxLength: 500
    },
    category: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['published', 'draft', 'deactivated'],
        default: 'published',
    },
    stock: {
        type: Number,
        default: 0
    },
    image: {
        type: String,
        required: true
    },
    images: {
        type: [String],
    },
    bestSeller: {
        type: Boolean,
        default: false
    },
    reviews: [review],
    createdAt: {
        type: Date,
        default: Date.now
    },
    modifiedAt: { type: Date },
}, { versionKey: false });

const cartItem = new Schema({
    product: {
        type: ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
}, { versionKey: false });

const cart = new Schema({
    user: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        type: ObjectId,
        ref: 'CartItem'
    }],
    totalPrice: {
        type: Number,
        required: true,
        default: 0
    },
}, { versionKey: false });

const orderItem = new Schema({
    product: product,
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
}, { versionKey: false });

const order = new Schema({
    user: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        type: ObjectId,
        ref: 'OrderItem',
        required: true
    }],
    totalPrice: {
        type: Number,
        required: true,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    modifiedAt: {
        type: Date
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'refund', 'cancel'],
        default: 'pending',
    },
}, { versionKey: false })

const User = model('User', user)
const Product = model('Product', product)
const Review = model('Review', review)
const CartItem = model('CartItem', cartItem)
const Cart = model('Cart', cart)
const OrderItem = model('OrderItem', orderItem)
const Order = model('Order', order)

export {
    User,
    Product,
    Review,
    CartItem,
    Cart,
    OrderItem,
    Order,
}