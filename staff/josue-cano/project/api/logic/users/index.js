import authenticateUser from "./authenticateUser.js";
import registerUser from "./registerUser.js";
import getLocations from "./getLocations.js";
import setUserFavorites from "./setUserFavorites.js";
import getUserFavorites from "./getUserFavorites.js";
import getUserDetails from "./getUserDetails.js";
import updateUser from "./updateUser.js";
import getFavorites from "./getFavorites.js";
import getUserProducts from "./getUserProducts.js";
import getUserChat from "./getUserChat.js";
import getUserChats from "./getUserChats.js";
import createChat from "./createChat.js";
import addChatMessage from "./addChatMessage.js";

const users = {
  authenticateUser,
  registerUser,
  getLocations,
  setUserFavorites,
  getUserFavorites,
  getUserDetails,
  updateUser,
  setUserFavorites,
  getFavorites,
  getUserProducts,
  getUserChat,
  getUserChats,
  createChat,
  addChatMessage,
};

export default users;
