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
      type: ObjectId,
      ref: "Ubicacion",
    },
    favorites: [
      {
        type: ObjectId,
        ref: "Producto",
      },
    ],
  },
  {
    timestamps: true, // Agrega campos `createdAt` y `updatedAt` automáticamente
    versionKey: false,
  }
);

const comment = new Schema(
  {
    writer: {
      type: ObjectId,
      required: true,
      ref: "User",
    },
    /*reader: {
        type: ObjectId,
        required: true,
        ref: "User",
      },*/
    text: {
      type: String,
      required: true,
      maxLength: 200,
    },
    product: {
      type: ObjectId,
      required: true,
      ref: "Producto",
    },
  },
  { timestamps: true, versionKey: false }
);

const categoria = new Schema(
  {
    nombre: {
      type: String,
      required: true,
      minLength: 2,
    },
    subcategorias: [
      {
        type: ObjectId,
        ref: "Subcategoria",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
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
  {
    timestamps: true,
    versionKey: false,
  }
);
const producto = new Schema(
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
    idCategoria: {
      type: ObjectId, // Relación con la colección de categorías
      required: true,
      ref: "Categoria",
    },
    idSubcategoria: {
      type: ObjectId, // Relación con la colección de subcategorías
      required: true,
      ref: "Subcategoria",
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
const ubicacion = new Schema(
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
    versionKey: false,
  }
);

const message = new Schema(
  {
    author: {
      type: ObjectId,
      required: true,
      ref: "User",
    },
    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
const chat = new Schema(
  {
    owner: {
      type: ObjectId,
      required: true,
      ref: "User",
    },
    peer: {
      type: ObjectId,
      required: true,
      ref: "User",
    },
    messages: [message],
  },
  { timestamps: true, versionKey: false }
);

const User = model("User", user);
const Producto = model("Producto", producto);
const Comment = model("Comment", comment);
const Categoria = model("Categoria", categoria);
const Subcategoria = model("Subcategoria", subcategoria);
const Ubicacion = model("Ubicacion", ubicacion, "ubicaciones");
const Message = model("Message", message);
const Chat = model("Chat", chat);

export { User, Producto, Comment, Categoria, Subcategoria, Ubicacion, Message, Chat };
