import mongoose, { now } from "mongoose"

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
      maxLength: 320,
    },
    profilePicture: { type: String },

    password: {
      type: String,
      required: true,
      minLength: 8,
      maxLength: 128,
    },
    role: {
      type: String,
      required: true,
      enum: ["dancer", "organizer", "moderator"],
      default: "dancer",
    },
    permission: {
      type: String,
      enum: ["read", "write"],
      default: "read",
    },
    city: {
      type: String,
      maxLength: 50,
    },
    favorites: [
      {
        type: ObjectId,
        ref: "Event",
      },
    ],
    registeredAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
)

const comment = new Schema({
  author: {
    type: ObjectId,
    required: true,
    ref: "User",
  },
  text: {
    type: String,
    required: true,
    maxLength: 200,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
})

const event = new Schema(
  {
    author: {
      type: ObjectId,
      required: true,
      ref: "User",
    },
    type: {
      type: String,
      enum: [
        "Sociales",
        "Escuelas de baile",
        "Clases particulares",
        "Congresos",
        "Masterclases",
      ],
      required: true,
    },
    images: [{ type: String, required: true }],
    text: {
      type: String,
      required: true,
      maxLength: 200,
    },

    date: {
      type: Date,
      required: true,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      province: {
        type: String,
      },
    },
    likes: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
    comments: [comment],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
)

const User = model("User", user)
const Event = model("Event", event)
const Comment = model("Comment", comment)

export { User, Event, Comment }
