import { connect, disconnect } from "mongoose";
import { User, Post, Comment } from "./models.js";
// import "./boost-mongoose.js";

const db = {
  connect,
  disconnect,
};

export default db;

export { User, Post, Comment };
