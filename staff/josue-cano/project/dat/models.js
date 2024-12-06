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
    ubicacion: {
      type: String,
    },
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

const categoria = new Schema(
  {
    nombre: {
      type: String,
      required: true,
      minLength: 2,
    },
    categorias: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subcategoria",
      },
    ],
  },
  { versionKey: false }
);

const subcategoria = new Schema(
  {
    nombre: {
      type: String,
      required: true,
      minLength: 2,
    },
    idCategoria: {
      type: ObjectId,
      required: true,
      ref: "Categoria",
    },
  },
  { versionKey: false }
);
const producto = new Schema(
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

const User = model("User", user);
const Producto = model("Producto", producto);
const Comment = model("Comment", comment);
const Categoria = model("Categoria", categoria);
const Subcategoria = model("Subcategoria", subcategoria);

export { User, Producto, Comment, Categoria, Subcategoria };
