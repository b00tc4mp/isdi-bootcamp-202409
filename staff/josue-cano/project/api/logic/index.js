import authenticateUser from "./authenticateUser.js";
import registerUser from "./registerUser.js";
import getCategorias from "./products/getCategorias.js";
import getSubCategorias from "./products/getSubCategorias.js";
import createProducto from "./products/createProducto.js";
import getProducts from "./products/getProducts.js";
import getProductDetails from "./products/getProductDetails.js";
import getLocations from "./getLocations.js";
import setUserFavorites from "./users/setUserFavorites.js";
import getUserFavorites from "./users/getUserFavorites.js";
import getUserDetails from "./users/getUserDetails.js";

const logic = {
  authenticateUser,
  registerUser,
  getCategorias,
  getSubCategorias,
  createProducto,
  getProducts,
  getProductDetails,
  getLocations,
  setUserFavorites,
  getUserFavorites,
  getUserDetails
};

export default logic;
