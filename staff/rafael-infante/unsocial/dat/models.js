import mongoose from 'mongoose'

const {
  Schema,
  model,
  Types: { ObjectId },
} = mongoose

const review = new Schema(
  {
    author: {
      type: ObjectId,
      required: true,
      ref: 'User',
    },
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
    calification: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
  },
  { versionKey: false }
)

const user = new Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 2,
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
    },
    role: {
      type: String,
      required: true,
      enum: ['caregiver', 'elder'],
      default: 'caregiver',
    },
    reviews: [review],
  },
  { versionKey: false }
)

const post = new Schema(
  {
    author: {
      type: ObjectId,
      required: true,
      ref: 'User',
    },
    image: {
      type: String,
      required: true,
    },
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
    reviews: [review],
  },
  { versionKey: false }
)

const User = model('User', user)
const Post = model('Post', post)
const Review = model('Review', review)

export { User, Post, Review }
