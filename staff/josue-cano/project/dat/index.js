import { connect, disconnect } from "mongoose";
import { User, Product, Comment, Category, Subcategory, Location, Message, Chat } from "./models.js";

const db = {
  connect,
  disconnect,
};

export default db;

export { User, Product, Comment, Category, Subcategory, Location, Message, Chat };
