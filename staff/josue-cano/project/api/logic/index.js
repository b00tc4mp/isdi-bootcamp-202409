import authenticateUser from "./authenticateUser.js";
import registerUser from "./registerUser.js";
import getCategorias from "./products/getCategorias.js";
import getSubCategorias from "./products/getSubCategorias.js";
import createProducto from "./products/createProducto.js";

const logic = {
  authenticateUser,
  registerUser,
  getCategorias,
  getSubCategorias,
  createProducto,
};

export default logic;
