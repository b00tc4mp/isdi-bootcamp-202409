


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
    minLength: 8
  },
  role: {
    type: String,
    required: true,
    enum: ['restaurant', 'employee'],
    default: 'employee'
  },
  license: {
    type: String,
    required: true,
    minLength: 9,
    maxLength: 10
  },
  date: {
    type: Date,
    default: Date.now
  }

}, { versionKey: false })

const expense = new Schema({
  amount: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  provider: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  author: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
}, { versionKey: false, timestamps: true })

const supplier = new Schema({
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
  contact: {
    type: String,
    required: true,
    unique: true,
    minLength: 3,
    maxLength: 30
  },
  addres: {
    type: String,
    required: true,
    minLength: 8
  },
  phone: {
    type: Number,
    required: true,
    minLength: 9,
    maxLength: 9
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  }
}, { versionKey: false })



const User = model('User', user)
const Supplier = model('Supplier', supplier)
const Expense = model('Expense', expense)

export {
  User,
  Supplier,
  Expense
}