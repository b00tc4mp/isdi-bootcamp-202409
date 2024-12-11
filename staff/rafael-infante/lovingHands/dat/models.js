import mongoose from 'mongoose'

const {
  Schema,
  model,
  Types: { ObjectId },
} = mongoose

const user = new Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match:
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      maxLength: 120,
    },
    role: {
      type: String,
      required: true,
      enum: ['caregiver', 'elder'],
      default: 'caregiver',
    },
    telephone: {
      type: String,
      match: /^\+\d{1,3}\d{10,12}$/, // Formato internacional: +34605828090
    },
    favorites: [
      {
        type: ObjectId,
        ref: 'Ad',
      },
    ],
  },
  { versionKey: false }
)

const review = new Schema(
  {
    author: {
      type: ObjectId,
      required: true,
      ref: 'User',
    },
    comment: {
      type: String,
      required: true,
      maxLength: 200,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    calification: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
  },
  { versionKey: false }
)

const ad = new Schema(
  {
    author: {
      type: ObjectId,
      required: true,
      ref: 'User',
    },
    files: [
      {
        type: String,
        required: true,
      },
    ],
    text: {
      type: String,
      required: true,
      maxLength: 200,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
      },
      coordinates: {
        type: [Number],
      },
      address: {
        type: String,
      },
    },
    reviews: [review],
  },
  { versionKey: false }
)

const User = model('User', user)
const Ad = model('Ad', ad)
const Review = model('Review', review)

export { User, Ad, Review }
