import { connect, disconnect } from "mongoose";
import { User, Producto, Comment, Categoria, Subcategoria } from "./models.js";

const db = {
  connect,
  disconnect,
};

export default db;

export { User, Producto, Comment, Categoria, Subcategoria };
