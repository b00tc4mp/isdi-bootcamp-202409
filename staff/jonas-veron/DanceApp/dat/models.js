import mongoose from "mongoose";

const {
  Schema,
  model,
  Types: { ObjectId },
} = mongoose;

const user = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 20
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match:
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
        maxLength: 320
    },

    password: {
      type: String,
      required: true,
      minLength: 8,
      maxLength: 128
    },
    role: {
      type: String,
      required: true,
      enum: ["dancer", "organizer", "moderator"],
      default: "dancer",
    },
    permission: {
      type: String,
      enum: ["none", "read", "write"],
      default: "none",
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    city: {
      type: String,
      default: "Girona",
      maxLength: 50
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
);

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
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const event = new Schema(
  {
    author: {
      type: ObjectId,
      required: true,
      ref: "User",
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
    // location: {
    //   type: pointSchema,
    //   required: true,
    // },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    likes: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
    comments: [comment],
  },
  { versionKey: false }
);

// const pointSchema = new Schema({
//   type: {
//     type: String,
//     enum: ['Point'],
//     required: true
//   },
//   coordinates: {
//     type: [Number],
//     required: true
//   }
// });


const User = model("User", user);
const Event = model("Event", event);
const Comment = model("Comment", comment);

export { User, Event, Comment };
