import mongoose from "mongoose";

const {
  Schema,
  model,
  Types: { ObjectId },
} = mongoose;

const user = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 2,
    },
    lastName: {
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

    avatar: {
      type: String,
      required: false,
    },
    location: {
      type: ObjectId,
      ref: 'Location'
    },
    favorites: [
      {
        type: ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    timestamps: true, // Agrega campos `createdAt` y `updatedAt` automáticamente
    versionKey: false,
  }
 );

 const comment = new Schema({
      writer: {
        type: ObjectId,
        required: true,
        ref: "User",
      },
      text: {
        type: String,
        required: true,
        maxLength: 200,
      },
      product: {
        type: ObjectId,
        required: true,
        ref: 'Product'
      },
    },
      {timestamps: true,
        versionKey: false
      }
    );

    const category = new Schema(
      {
        name: {
          type: String,
          required: true,
          minLength: 2,
        },
        subcategories: [
          {
            type: ObjectId,
            ref: "Subcategory",
          },
        ],
      },
      { 
timestamps: true,
        versionKey: false }
    );

const subcategory = new Schema(
  {
    nombre: {
      type: String,
      required: true,
      minLength: 2,
    },
    category: {
      type: ObjectId,
      required: true,
      ref: "Category",
    },
  },
  { 
    timestamps: true,
    versionKey: false }
);
const product = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 100,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 500,
    },
    author: {
      type: ObjectId,
      required: true,
      ref: "User",
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    category: {
      type: ObjectId, // Relación con la colección de categorías
      required: true,
      ref: "Category",
    },
    subcategory: {
      type: ObjectId, // Relación con la colección de subcategorías
      required: true,
      ref: "Subcategory",
    },
    likes: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
  },

  {
    timestamps: true, // Agrega campos `createdAt` y `updatedAt` automáticamente
    versionKey: false,
  }
);
const location = new Schema(
  {
    ciudad: {
      type: String,
      required: true,
      minLength: 2,
    },
    src: {
      type: String,
      required: true,
    },
  },
  { 
    timestamps: true,
    versionKey: false }
);


const message = new Schema(
  {
    author: {
      type: ObjectId,
      required: true,
      ref: 'User'
    },
    text: {
      type: String,
      required: true
    },
  },
  { 
    timestamps: true,
    versionKey: false }
);
const chat = new Schema({
  owner: {
    type: ObjectId,
    required: true,
    ref: 'User',
  },
  peer: {
    type: ObjectId,
    required: true,
    ref: 'User',
  },
  messages: [ message ],
},
  {timestamps: true, versionKey: false});

const User = model("User", user);
const Product = model("Product", product);
const Comment = model("Comment", comment);
const Category = model("Category", category);
const Subcategory = model("Subcategory", subcategory);
const Location = model('Location', location, 'locations');
const Message = model('Message', message);
const Chat = model('Chat', chat);

export { User, Product, Comment, Category, Subcategory, Location, Message, Chat };
